<script lang="ts">
	import { SvelteTheme, useTheme } from "svelte-themes";
	import { Toaster } from "svelte-french-toast";
	import Cursor from "$lib/components/Cursor.svelte";

	let { children } = $props();

	const themeStore = localStorage.getItem("theme");
	const theme = useTheme();

	if (!themeStore) {
		localStorage.setItem("theme", "dark");
		theme.theme = "dark";
	}
</script>

<svelte:head>
	<link rel="icon" href="/assets/logo.png" />
	<script
		defer
		src="https://umami.jessehoekema.com/script.js"
		data-website-id="13a0ae9c-fd97-4214-b7f7-f99b14bc080e"
	></script>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=G-3Y1FLSPCGE"
	></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());

		gtag("config", "G-3Y1FLSPCGE");
	</script>
</svelte:head>

<Toaster />
<SvelteTheme>
	<Cursor />
	{@render children()}
</SvelteTheme>
