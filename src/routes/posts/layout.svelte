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
  @import './src/_core';

  article {
    @include desktop {
      --font-size: 18px;
      --font-size-mono: 15px;
    }

    @include mobile {
      --font-size: 16px;
      --font-size-mono: 14px;
    }

    font-size: var(--font-size);
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    color: var(--color-highlight);
    letter-spacing: -2.4px;
    margin: 0 0 0.5em 0;
    opacity: 0.75;

    @include desktop {
      font-size: 48px;
    }

    @include mobile {
      font-size: 30px;
      padding: 0 10px;
    }
  }

  :global(p) {
    text-indent: 0.6em;
  }

  :global(code) {
    font-size: var(--font-size-mono);
  }

  :global(p code) {
    font-size: var(--font-size-mono);
  }
</style>
