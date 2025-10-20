<!-- broken breaks page scroll! -->
<script lang="ts">
	import { page } from '$app/stores';
    import '../404.css'
	$: status = $page.status;
	$: message = $page.error?.message ?? 'Page Not Found';
</script>

<svelte:head>
	<title>{status} Not Found - Jesse Hoekema</title>
</svelte:head>

<div class="center-box">
	<h1>{status}</h1>
	<p>{message} <a href="/" data-sveltekit-reload>Return Home</a></p>
</div>