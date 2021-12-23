<script lang="ts">
  import '../app.scss'
</script>

<slot />

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style lang="scss">
  :global(body) {
    background: hsl(var(--primary-hue), 43%, 15%);
  }

  :global(p) {
    line-height: 32px;
  }

  :global(code) {
    font-family: 'Fira Code', monospace;
  }
</style>
