<script lang="ts">
  export let title: string
  export const date: string = ''
</script>

<header>
  <a href="/posts" sveltekit:prefetch>
    <svg
      width="19px"
      height="20px"
      viewBox="0 0 19 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M18,10 L2,10 M18.68,10 L11,2.32 M18.68,10 L11,17.68"
        stroke-width="2"
        transform="translate(10.500000, 10.000000) rotate(-180.000000) translate(-10.500000, -10.000000)"
      />
    </svg> All posts</a
  >
</header>

<article id="post--article">
  <h1>{title}</h1>
  <slot />
</article>

<style lang="scss">
  @import './src/_core';

  header {
    display: flex;
    height: 62px;

    @include mobile {
      border-bottom: 1px solid hsl(258, 34%, 32%);
      padding: 0 10px;
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      letter-spacing: 3px;
      text-transform: uppercase;

      @include desktop {
        font-size: 14px;
      }

      @include mobile {
        color: var(--color-highlight);
        font-size: 12px;
      }
    }

    svg > path {
      stroke: var(--color-highlight);
    }
  }

  article {
    @include desktop {
      --font-size: 18px;
      --font-size-mono: 15px;

      padding-top: 1em;
      width: 60em;
    }

    @include mobile {
      --font-size: 16px;
      --font-size-mono: 14px;

      padding: 1em 0 1em;
      width: 100%;
    }

    font-size: var(--font-size);
    -webkit-font-smoothing: antialiased;

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
  }

  :global(#post--article p code) {
    font-family: 'Fira Code', monospace;
    font-size: var(--font-size-mono);
  }

  :global(#post--article a) {
    text-decoration: underline;
    text-decoration-color: var(--color-highlight);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
    text-decoration-skip-ink: all;
  }
</style>
