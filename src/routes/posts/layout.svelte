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
    background: red;
  }
</style>
