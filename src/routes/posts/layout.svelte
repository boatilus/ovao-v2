<script>
  export let title
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
  <meta property="og:title" content={title} />
</svelte:head>

<article>
  <h1>{title}</h1>
  <slot />
</article>

<style lang="scss">
  article {
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    color: var(--color-highlight);
    font-size: 48px;
    letter-spacing: -2.4px;
    opacity: 0.75;
  }

  :global(code) {
    font-size: 14px;
  }

  :global(p) {
    text-indent: 0.6em;
  }
</style>
