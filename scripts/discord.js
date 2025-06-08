const userId = '1263110378666065944'; 

async function getUserStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        
        if (!response.ok) {
            console.error('Failed to fetch user status:', response.statusText);
            return;
        }

        const data = await response.json();
        const status = data.data.discord_status || 'offline';
        const userText = data.data.discord_user.display_name
        updateDotStatus(status);
    } catch (error) {
        console.error('Error fetching user status:', error);
    }
}

function updateDotStatus(status) {
    const dot = document.getElementById('status-dot');
    dot.className = 'dot'; 

    switch (status) {
        case 'online':
            dot.classList.add('online');
            break;
        case 'idle':
            dot.classList.add('idle');
            break;
        case 'dnd':
            dot.classList.add('dnd');
            break;
        default:
            dot.classList.add('offline');
    }
}
function updateUsername(userText) {
    const usernameText = document.getElementById('username');
    usernameText.textContent = userText;
}
async function updatePfp() {
    try {
        const pfpResponse = await fetch(`https://discordpfp.vercel.app/api/json?id=${userId}`);
        
        if (!pfpResponse.ok) {
            console.error('Failed to fetch user profile picture:', pfpResponse.statusText);
            return;
        }

        const pfpData = await pfpResponse.json();
        const pfpUrl = pfpData.avatar_url;

        const pfpElement = document.getElementsByClassName('profile-img')[0];
        if (pfpElement) {
            pfpElement.src = pfpUrl;
            pfpElement.alt = 'User Profile Picture';
        } else {
            console.error('Profile picture element not found');
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error);
    }
    
} 

updatePfp();

getUserStatus();