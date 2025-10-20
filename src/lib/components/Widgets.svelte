<script lang="ts">
	import type { Track } from '$lib/types';
	export let track: Track | null;
    export let codingSession: string;
    export let status: string | 'offline';
    export let usernameText: string | 'Jessi Flessi';
</script>

<div class="widgets">
    <div id="widget">
        <h1>Last coding session</h1>
        <p id="codingsession">{codingSession}</p>
    </div>

    <div id="widget">
        <h1>Spotify last listened</h1>
        <div class="track-info">
            <div class="cover">
                <img
                    id="cover-image"
                    src={track
                        ? track.images?.find(img => img.size === 'large')?.url || 'assets/default_cover.png'
                        : 'assets/default_cover.png'}
                    alt={track
                        ? `Cover of ${track.name} by ${track.artist.name}`
                        : 'Album Cover'}
                />
            </div>
            <div id="track-info-text">
                <p id="track-name" style="margin-bottom: 0px;">
                    {#if track}
                        {track.name}
                    {:else}
                        Loading...
                    {/if}
                </p>
                <p id="track-artist" style="margin-top: 0px;">
                    {#if track}
                        {track.artist.name}
                    {:else}
                        Artist Name
                    {/if}
                </p>
            </div>
        </div>
    </div>

    <div id="widget">
        <h1>Discord</h1>
        <div style="display: flex;">
            <div class="profile-container">
                <img
                    src="/assets/pfp_new.png"
                    alt="Profile"
                    class="profile-img"
                />
                <div id="status-dot" class="dot {status}"></div>
            </div>
            <p style="font-size: 15px; margin-top: 15px;">{usernameText}</p>
        </div>
    </div>
</div>
