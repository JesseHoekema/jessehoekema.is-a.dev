const userId = '1277550219252207659'; // De gebruikers-ID die je wilt volgen

async function getUserStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        
        if (!response.ok) {
            console.error('Failed to fetch user status:', response.statusText);
            return;
        }

        const data = await response.json();
        const status = data.data.discord_status || 'offline';
        updateDotStatus(status);
    } catch (error) {
        console.error('Error fetching user status:', error);
    }
}

function updateDotStatus(status) {
    const dot = document.getElementById('status-dot');
    dot.className = 'dot'; // Reset classes

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

// Initial call to set the status
getUserStatus();

// Refresh status every second
setInterval(getUserStatus, 100);
