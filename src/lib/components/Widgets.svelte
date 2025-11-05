<script lang="ts">
	import type { Track } from '$lib/types';
	import { onMount } from 'svelte';
	
	export let track: Track | null;
    export let codingSession: string;
    export let status: string | 'offline';
    export let usernameText: string | 'Jessi Flessi';


	let widgetOrder = [0, 1, 2];
	let draggedIndex: number | null = null;
	let dragOverIndex: number | null = null;

	onMount(() => {
		const saved = localStorage.getItem('widgetOrder');
		if (saved) {
			widgetOrder = JSON.parse(saved);
		}
	});

	function handleDragStart(event: DragEvent, index: number) {
		draggedIndex = index;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/html', '');
		}
	}

	function handleDragOver(event: DragEvent, index: number) {
		event.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			dragOverIndex = index;

			const newOrder = [...widgetOrder];
			const draggedId = newOrder[draggedIndex];
			newOrder.splice(draggedIndex, 1);
			newOrder.splice(index, 0, draggedId);
			widgetOrder = newOrder;
			draggedIndex = index;
		}
	}

	function handleDragLeave() {

	}

	function handleDrop(event: DragEvent, dropIndex: number) {
		event.preventDefault();
		
		localStorage.setItem('widgetOrder', JSON.stringify(widgetOrder));
		
		draggedIndex = null;
		dragOverIndex = null;
	}

	function handleDragEnd() {
		draggedIndex = null;
		dragOverIndex = null;
	}
</script>

<div class="widgets">
	{#each widgetOrder as widgetId, index (widgetId)}
		{#if widgetId === 0}
			<div 
				id="widget"
				class:dragging={draggedIndex === index}
				draggable="true"
				on:dragstart={(e) => handleDragStart(e, index)}
				on:dragover={(e) => handleDragOver(e, index)}
				on:dragleave={handleDragLeave}
				on:drop={(e) => handleDrop(e, index)}
				on:dragend={handleDragEnd}
				role="button"
				tabindex="0"
				style="cursor: grab;"
			>
				<h1>Last coding session</h1>
				<p id="codingsession">{codingSession}</p>
			</div>
		{:else if widgetId === 1}
			<div 
				id="widget"
				class:dragging={draggedIndex === index}
				draggable="true"
				on:dragstart={(e) => handleDragStart(e, index)}
				on:dragover={(e) => handleDragOver(e, index)}
				on:dragleave={handleDragLeave}
				on:drop={(e) => handleDrop(e, index)}
				on:dragend={handleDragEnd}
				role="button"
				tabindex="0"
				style="cursor: grab;"
			>
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
		{:else if widgetId === 2}
			<div 
				id="widget"
				class:dragging={draggedIndex === index}
				draggable="true"
				on:dragstart={(e) => handleDragStart(e, index)}
				on:dragover={(e) => handleDragOver(e, index)}
				on:dragleave={handleDragLeave}
				on:drop={(e) => handleDrop(e, index)}
				on:dragend={handleDragEnd}
				role="button"
				tabindex="0"
				style="cursor: grab;"
			>
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
		{/if}
	{/each}
</div>

<style>
	#widget.dragging {
		opacity: 0.6;
		transition: all 0.3s ease;
	}
	
	#widget[draggable="true"]:active {
		cursor: grabbing !important;
	}
</style>
