<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import '../app.scss'
  import './posts/global.scss'
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
</style>
