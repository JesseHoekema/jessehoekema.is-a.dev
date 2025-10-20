<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement;

	onMount(() => {
		if (!cursor) return;

		const move = (e: MouseEvent) => {
			cursor.style.left = `${e.clientX}px`;
			cursor.style.top = `${e.clientY}px`;
		};

		const over = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const tag = target.tagName.toLowerCase();
			const id = target.id?.toLowerCase?.() || '';
			const className = target.className?.toString()?.toLowerCase?.() || '';

			if (tag !== 'body' && tag !== 'html' && id !== 'root' && className !== 'main') {
				cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
			}
		};

		const out = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const tag = target.tagName.toLowerCase();
			const id = target.id?.toLowerCase?.() || '';
			const className = target.className?.toString()?.toLowerCase?.() || '';

			if (tag !== 'body' && tag !== 'html' && id !== 'root' && className !== 'main') {
				cursor.style.transform = 'translate(-50%, -50%) scale(1)';
			}
		};

		const leave = () => (cursor.style.opacity = '0');
		const enter = () => (cursor.style.opacity = '1');

		document.addEventListener('mousemove', move);
		document.addEventListener('mouseover', over);
		document.addEventListener('mouseout', out);
		document.addEventListener('mouseleave', leave);
		document.addEventListener('mouseenter', enter);

		return () => {
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseover', over);
			document.removeEventListener('mouseout', out);
			document.removeEventListener('mouseleave', leave);
			document.removeEventListener('mouseenter', enter);
		};
	});
</script>

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--cursor-color);
		pointer-events: none;
		transform: translate(-50%, -50%) scale(1);
		transition: transform 0.15s ease, opacity 0.2s ease;
		z-index: 9999;
		opacity: 1;
	}
</style>

<div bind:this={cursor} class="cursor"></div>
