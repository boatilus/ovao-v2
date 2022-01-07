<script>
  //import './global.scss'

  export let title
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
    rel="stylesheet"
  />
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

      width: 60em;
    }

    @include mobile {
      --font-size: 16px;
      --font-size-mono: 14px;

      padding: 0.5em 0 1em;
      width: 100%;
    }

    font-size: var(--font-size);
    -webkit-font-smoothing: antialiased;
  }

  h1 {
    color: var(--color-highlight);
    cursor: default;
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
</style>
