<script lang="ts">
  function openBMC() {
    window.open('https://www.buymeacoffee.com/jessehoekema', '_blank');
  }
</script>

<button class="bmc-btn" on:click={openBMC} aria-label="Buy me a coffee">
  <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="" />
  <span>Donate</span>
</button>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
  .bmc-btn {
    position: fixed;
    left: 18px;
    bottom: 18px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: var(--kofi-bg);
    color: var(--kofi-text);
    border: none;
    border-radius: 100px;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s, box-shadow 0.2s;
    font-weight: bold;
    font-family: 'Nunito', 'Quicksand', sans-serif;
  }

  .bmc-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .bmc-btn img {
    width: 24px;
    height: 24px;
  }
</style>