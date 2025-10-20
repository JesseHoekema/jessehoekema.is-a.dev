<script>
    import { goto } from "$app/navigation";
    import "./projects.css";

    const { data } = $props();
</script>

<svelte:head>
    <title>Projects - Jesse Hoekema</title>
    <meta name="title" content="Projects - Jesse Hoekema - Fullstack Developer" />
    <meta
        name="description"
        content="Nothing To Worry About Just My Personal Site"
    />
    <meta property="og:title" content="Projects - Jesse Hoekema - Fullstack Developer" />
    <meta
        property="og:description"
        content="This Is Just My Personal Site :)"
    />
    <meta property="og:type" content="website" />
</svelte:head>

<div class="back">
    <a href="/" id="moreButton" data-sveltekit-reload>
        <button>&lt;&lt; Back </button>
    </a>
</div>
<div class="projects-container">
    <h1 class="title proj-title">Projects</h1>
    <div class="projects">
        {#each data.projects as project}
            <a href={project.link} style="text-decoration: none;">
                <div class="project">
                    <h1 class="title">{project.title}</h1>
                    <p class="description">{project.description}</p>
                </div>
            </a>
        {/each}
    </div>
</div>
