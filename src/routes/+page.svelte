<script lang="ts">
    import '../app.css';
    import { onMount } from "svelte";
    import ThemeToggle from "$lib/components/ThemeToggle.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import Widgets from "$lib/components/Widgets.svelte";
    import About from "$lib/components/About.svelte";
    import Skills from "$lib/components/Skills.svelte";
    import Projects from "$lib/components/Projects.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Donate from "$lib/components/Donate.svelte";
    import type { PageData } from "./$types";
    import type { Track } from "$lib/types";

    export let data: PageData;

    let track: Track | null = data.track;
    const username = "jessehoekema";
    let socket: WebSocket;
    let codingSession: string = data.codingSession;
    let status: string = data.status;
    let usernameText: string = data.usernameText;

    function updateTrackInfo(newTrack: Track | null) {
        track = newTrack;
    }

    onMount(() => {
        socket = new WebSocket("wss://lastfm.jessehoekema.com");

        socket.onopen = () => {
            console.log("Connected to LastFM WebSocket");
        };

        socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
            const opcode = parsed.op;
            const data = parsed.d;

            if (opcode === 0) {
                // Keep-alive ping
                setInterval(() => {
                    socket.send(JSON.stringify({ op: 1 }));
                }, data.pingInterval);

                socket.send(
                    JSON.stringify({
                        op: 2,
                        d: { user: username, type: "nowplaying" },
                    }),
                );
            }

            if (opcode === 2) {
                if (data.error) {
                    console.error("Error:", data.error);
                    updateTrackInfo(null);
                    return;
                }
                updateTrackInfo(data.track);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            updateTrackInfo(null);
        };

        return () => socket.close();
    });
</script>

<svelte:head>
    <title>Jesse Hoekema - Fullstack Developer</title>
    <meta name="title" content="Jesse Hoekema - Fullstack Developer" />
    <meta
        name="description"
        content="Nothing To Worry About Just My Personal Site"
    />
    <meta property="og:title" content="Jesse Hoekema - Fullstack Developer" />
    <meta
        property="og:description"
        content="This Is Just My Personal Site :)"
    />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="fixed right-[10px] top-[10px]">
    <ThemeToggle />
</div>

<div class="main">
    <Donate />
    <Profile />
    <Widgets {track} {codingSession} {status} {usernameText} />
    <About />
    <Skills />
    <Projects />
    <Contact />
</div>
