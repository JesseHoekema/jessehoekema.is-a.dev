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
function updateUsername() {
    const usernameText = document.getElementById('username');
    usernameText.textContent = userText
}


getUserStatus();
updateUsername()


setInterval(getUserStatus, 100);