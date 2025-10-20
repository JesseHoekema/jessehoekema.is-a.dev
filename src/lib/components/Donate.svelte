<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;

    script.onload = () => {
      const getKofiBg = () =>
        getComputedStyle(document.documentElement).getPropertyValue('--kofi-bg').trim() || '#FECA65';
      const getKofiText = () =>
        getComputedStyle(document.documentElement).getPropertyValue('--kofi-text').trim() || '#000000';

      const drawWidget = () => {
        const oldWidget = document.querySelector('.kofiWidgetOverlay iframe');
        if (oldWidget) oldWidget.remove();

        // @ts-ignore
        kofiWidgetOverlay.draw('jessiflessi', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Donate',
          'floating-chat.donateButton.background-color': getKofiBg(),
          'floating-chat.donateButton.text-color': getKofiText()
        });
      };
      drawWidget();

      const observer = new MutationObserver(() => drawWidget());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    };

    document.body.appendChild(script);
  });
</script>

<div class="kofiWidgetOverlay"></div>