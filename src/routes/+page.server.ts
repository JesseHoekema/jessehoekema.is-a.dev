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
            fetch(`https://lastfm.dandandev.xyz/api/nowplaying/${USERNAME}`),
            fetch('/api/wakatime'),
            fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        ]);

        if (lastfmRes.ok) {
            const data = await lastfmRes.json();
            track = data.track ?? null;
        }

        if (wakatimeRes.ok) {
            const wakatimeData = await wakatimeRes.json();
            const { hours, minutes } = wakatimeData;

            codingSession = hours === 0 && minutes === 0
                ? 'Not coded today'
                : `${hours} Hours & ${minutes} Minutes`;
        }

        if (discordRes.ok) {
            const discordData = await discordRes.json();
            status = discordData.data?.discord_status || 'offline';
            usernameText = discordData.data?.discord_user?.display_name || 'Unknown User';
        }
    } catch (err) {
        console.error('Error loading page data:', err);
    }

    return {
        track,
        codingSession,
        status,
        usernameText
    };
};
