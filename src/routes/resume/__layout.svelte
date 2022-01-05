<script lang="ts" context="module">
  import { person } from '$lib/util/schema'
  import { serialize } from '$lib/util/schema'

  export const prerender = true
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { theme } from '$lib/stores/theme'
  import themes from '../../themes.json'

  theme.set(themes['/resume*'])

  onMount(() => {
    let stylesheet = document.createElement('link')
    stylesheet.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap'
    stylesheet.rel = 'stylesheet'
    // Temporarily set media to something inapplicable to ensure it'll fetch
    // without blocking rendering.
    stylesheet.media = 'only x'

    // Set the media back when the stylesheet's loaded.
    stylesheet.onload = () => {
      stylesheet.media = 'all'
    }

    document.getElementsByTagName('head')[0].appendChild(stylesheet)
  })
</script>

<svelte:head>
  <title>Résumé - Ron Jones</title>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  {@html serialize(person)}
</svelte:head>

<slot />

<style lang="scss">
  @import './src/_core';

  @media print {
    :global(body) {
      background-color: transparent;
    }
  }
</style>
