<script lang="ts">
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let name = '';
  let email = '';
  let message = '';
  let sendDisabled = false;
  let widgetId: number;

  let turnstileToken = '';

  function handleSuccess(token: string) {
    turnstileToken = token;
    console.log(token)
  }

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      widgetId = (window as any).turnstile.render('#turnstile-container', {
        sitekey: '0x4AAAAAAB7akM_AhVXoAcw4',
        callback: handleSuccess,
      });
    };
  });

  async function handleSubmit() {
    if (!turnstileToken) {
      toast.error('Please complete the CAPTCHA');
      return;
    }

    const data = { name, email, message, turnstileToken };

    try {
      await toast.promise(
        fetch('https://contactmin.jessehoekema.com/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        }),
        {
          loading: 'Sending...',
          success: 'Message sent!',
          error: 'Could not send message.',
        }
      );

      sendDisabled = true;

      name = '';
      email = '';
      message = '';
      turnstileToken = '';

      (window as any).turnstile.reset(widgetId);
      sendDisabled = false;

    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="contact">
  <h1 class="title">Contact</h1>
  <div class="contact-div">
    <input type="text" class="input-1" placeholder="Name" bind:value={name} />
    <br />
    <input type="text" class="input-1" placeholder="Email" style="margin-top: 10px;" bind:value={email} />
    <br />
    <textarea class="input-2" placeholder="Your Message" style="margin-top: 10px;" bind:value={message}></textarea>
    <br />

    <div id="turnstile-container"></div>

    <button class="send-btn" type="button" on:click={handleSubmit} disabled={sendDisabled}>
      Send
    </button>
  </div>
</div>