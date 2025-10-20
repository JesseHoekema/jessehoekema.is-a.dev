<script>
    import { goto } from "$app/navigation";
</script>

<div class="projects">
    <h1 class="title projects-title">Projects</h1>
    <div class="project-grid">
        <div class="project">
            <h1 class="title-project">ToetsenBord</h1>
            <p class="des-project">
                An app to get all tests that you have<br />
                in somtoday and learn for them<br />
                all in one dashboard (in progress)
            </p>
            <img
                src="assets/tools/toetsenbord.svg"
                class="toolicons"
                alt="Tool Icons"
            />
        </div>
        <!-- <div class="project">
            <h1 class="title-project">JHOS</h1>
            <p class="des-project">
                This Is My Own OS<br>
                Its a linux distro that is open-source<br>
                We are making it so <a href="https://discord.gg/uWZFNdJGXk">join the discord</a>
            </p>
            <img src="assets/tools/jhos.svg" class="toolicons" alt="Tool Icons" />
        </div> -->

        <div class="project">
            <h1 class="title-project">Imajes.space</h1>
            <p class="des-project">
                Imajes is a simple file sharing<br />
                and hosting platform where you<br />
                Can upload files
                <a href="https://imajes.space" class="link">try it</a>
            </p>
            <img
                src="assets/tools/imajes.svg"
                class="toolicons"
                alt="Tool Icons"
            />
        </div>

        <div class="project">
            <h1 class="title-project">Fimpid AI</h1>
            <p class="des-project">
                I made a AI code editor to use<br />
                in the browser for fimpid. I used<br />
                gemini as ai model.
            </p>
            <img
                src="assets/tools/fimpidai.svg"
                class="toolicons"
                alt="Tool Icons"
            />
        </div>

        <div class="project">
            <h1 class="title-project">BubbleCloud</h1>
            <p class="des-project">
                Made a self-hostable simple storage<br />
                solution with a dash and app.
                <a
                    href="https://github.com/JesseHoekema/BubbleCloud"
                    class="link">here</a
                >
            </p>
            <img
                src="assets/tools/bubblecloud.svg"
                class="toolicons"
                alt="Tool Icons"
            />
        </div>

        <div class="project">
            <h1 class="title-project">Peaky Blinders</h1>
            <p class="des-project">
                I Made The Site For Peaky Blinders<br />
                Go To <a href="https://pk.edyt.lol/">The Site</a>
            </p>
            <img src="assets/tools/pk.svg" class="toolicons" alt="Tool Icons" />
        </div>

        <div class="project">
            <h1 class="title-project">JHBROWSER</h1>
            <p class="des-project">
                This Is My Own Browser<br />
                Its Not Done, Only The Extension<br />
                You Can Find And Install It
                <a
                    href="https://chromewebstore.google.com/detail/jhbrowser-tabs/ofghhehidddjmbpcgkipclkenmdkkacn"
                    >here</a
                >
            </p>
            <img
                src="assets/tools/jhbrowser.svg"
                class="toolicons"
                alt="Tool Icons"
            />
        </div>
    </div>
    <div class="moreDiv">
        <p>&#8203;</p>
        <a href="/projects" id="moreButton" data-sveltekit-reload>
            <button>More</button>
        </a>
        <p>&#8203;</p>
    </div>
</div>
