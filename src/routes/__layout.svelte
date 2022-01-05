<script lang="ts">
  import type { Theme } from '$lib/stores/theme'
  //import { dev } from '$app/env' // TODO: bring in tracking script
  import { started } from '$lib/stores/core'
  import { onMount } from 'svelte'
  import { theme, createSubscriber } from '$lib/stores/theme'

  import MainMenu from '$lib/components/MainMenu.svelte'

  import '../app.scss'

  onMount(() => {
    $started = true

    const computed = getComputedStyle(document.documentElement)

    // Normalize original values by running colors through chroma.
    const background =
      $theme.background || computed.getPropertyValue('--background-color')
    const text = $theme.text || computed.getPropertyValue('--text-color')
    const links = $theme.links || computed.getPropertyValue('--link-color')

    // Track the previous theme to allow update skips.
    const previous_theme: Theme = { background, text, links }

    const subscriber = createSubscriber(document, previous_theme)
    const unsubscribe = theme.subscribe(subscriber)

    return () => {
      unsubscribe()
    }
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <slot />
</main>

<MainMenu />

<style lang="scss">
  @import './src/_core';

  main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 1;
  }
</style>
