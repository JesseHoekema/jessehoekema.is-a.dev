const apiKey = '3a8994ba1c698ea3509fbd153704e4fd';
const username = 'jessehoekema';

async function fetchNowPlaying() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
        const data = await response.json();

        const track = data.recenttracks.track[0];
        const artist = track.artist['#text'];
        const trackName = track.name;
        const albumCover = track.image[2]['#text']; // Get the medium-sized image

        document.getElementById('artist').textContent = `Artist: ${artist}`;
        document.getElementById('track').textContent = `Track: ${trackName}`;
        document.getElementById('album-cover').src = albumCover;
    } catch (error) {
        console.error('Error fetching now playing:', error);
    }
}

// Fetch now playing on page load
fetchNowPlaying();

// Update every minute (you can adjust the interval as needed)
setInterval(fetchNowPlaying, 2000);
