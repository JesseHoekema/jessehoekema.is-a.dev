const apiKey = '3a8994ba1c698ea3509fbd153704e4fd';  // Replace with your Last.fm API key
const username = 'jessehoekema';  // Replace with the Last.fm username you want to track
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const trackTime = document.getElementById('track-time');
const coverImage = document.getElementById('cover-image');

// Fetch the last played track using the Last.fm API
async function fetchLastPlayed() {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.recenttracks.track.length > 0) {
            const track = data.recenttracks.track[0];
            trackName.textContent = track.name;
            trackArtist.textContent = track.artist['#text'];
            trackTime.textContent = `Played on: ${track.date ? new Date(track.date['uts'] * 1000).toLocaleString() : 'Just now'}`;
            coverImage.src = track.image[2]['#text'];  // Get the large album cover image
            coverImage.alt = `Cover of ${track.name} by ${track.artist['#text']}`;
        } else {
            trackName.textContent = 'No recent tracks found.';
            trackArtist.textContent = '';
            trackTime.textContent = '';
            coverImage.src = '';
        }
        } catch (error) {
            console.error('Error fetching data:', error);
            trackName.textContent = 'Failed to load track data.';
            trackArtist.textContent = '';
            trackTime.textContent = '';
            coverImage.src = '';
        }
}


fetchLastPlayed();
