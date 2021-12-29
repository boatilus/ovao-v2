<script lang="ts">
  import '../app.scss'
</script>

<main>
  <slot />
</main>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style lang="scss">
  @import './src/_core';

  :global(body) {
    background: hsl(var(--primary-hue), 43%, 15%);

    @include desktop {
      margin: 0 4vw;
    }
  }

  main {
    @include desktop {
      padding: 3.5em 0;
      width: 60em;
    }

    @include mobile {
      padding: 0.5em 0 1em;
      width: 100%;
    }
  }

  :global(p) {
    line-height: calc(18px * var(--line-height-ratio));

    @include mobile {
      padding: 0 10px;
    }
  }

  :global(code) {
    font-family: 'Fira Code', monospace;
  }

  :global(a) {
    text-decoration: underline;
    text-decoration-color: var(--color-highlight);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
    text-decoration-skip-ink: all;
  }
</style>
