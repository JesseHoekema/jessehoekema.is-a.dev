import type { PageServerLoad } from './$types';
import type { Track } from '$lib/types';

const USERNAME = 'jessehoekema';
const userId = '1263110378666065944';

export const load: PageServerLoad = async ({ fetch }) => {
    let track: Track | null = null;
    let codingSession = 'Not coded today';
    let status = 'offline';
    let usernameText = 'Jessi Flessi';

    try {
        const [lastfmRes, wakatimeRes, discordRes] = await Promise.all([
            fetch(`https://lastfm.jessehoekema.com/api/nowplaying/${USERNAME}`),
            fetch('/api/wakatime'),
            fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        ]);

        if (lastfmRes.ok) {
            const data = await lastfmRes.json();
            track = data.track ?? null;
        }

        if (wakatimeRes.ok) {
            const { hours, minutes } = await wakatimeRes.json();
            codingSession = hours || minutes ? `${hours} Hours & ${minutes} Minutes` : 'Not coded today';
        }

        if (discordRes.ok) {
            const data = await discordRes.json();
            status = data.data?.discord_status || 'offline';
            usernameText = data.data?.discord_user?.display_name || 'Unknown User';
        }
    } catch (err) {
        console.error('Error loading page data:', err);
    }

    return { track, codingSession, status, usernameText };
};
