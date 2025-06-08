const apiKey = '3a8994ba1c698ea3509fbd153704e4fd';  
const username = 'jessehoekema';  
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const trackTime = document.getElementById('track-time');
const coverImage = document.getElementById('cover-image');

const socket = new WebSocket("wss://lastfm.dandandev.xyz");

socket.onopen = () => {
    console.log("Connected to LastFM WebSocket");
};

socket.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    const opcode = parsed.op;
    const data = parsed.d;

    if (opcode === 0) {
        setInterval(() => {
            socket.send(JSON.stringify({ op: 1 }));
        }, data.pingInterval);

        socket.send(JSON.stringify({
            op: 2,
            d: { user: "jessehoekema" }
        }));
    }

    if (opcode === 2) {
        if (data.error) {
            console.error('Error:', data.error);
            updateTrackInfo(null);
            return;
        }

        const track = data.track;
        updateTrackInfo(track);
    }
};

socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
    updateTrackInfo(null);
};

function updateTrackInfo(track) {
    if (!track) {
        trackName.textContent = 'Failed to load track data';
        trackArtist.textContent = '';
        trackTime.textContent = '';
        coverImage.src = '';
        coverImage.alt = '';
        return;
    }

    trackName.textContent = track.name;
    trackArtist.textContent = track.artist.name;
    trackTime.textContent = track.nowplaying ? 'Now Playing' : '';

    
    const largeImage = track.images.find(img => img.size === 'large') ||
        track.images.find(img => img.size === 'extralarge') ||
        track.images[0];

    if (largeImage) {
        coverImage.src = largeImage.url;
        coverImage.alt = `Cover of ${track.name} by ${track.artist.name}`;
    } else {
        coverImage.src = '';
        coverImage.alt = '';
    }
}


function adjustFontSize() {
    const container = document.getElementById('track-info-text');
    const text = document.getElementById('track-title');
    let fontSize = parseInt(window.getComputedStyle(text).fontSize);

    while (text.scrollHeight > container.offsetHeight && fontSize > 10) {
        fontSize--;
        text.style.fontSize = `${fontSize}px`;
    }
}

window.onload = adjustFontSize;
window.onresize = adjustFontSize;