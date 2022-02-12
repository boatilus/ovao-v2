<script lang="ts">
  import type { Theme } from '$lib/stores/theme'
  import { dev } from '$app/env'
  import { page } from '$app/stores'
  import { GOOGLE_MEASUREMENT_ID } from '$lib/variables'
  import { fillRequestIdleCallback } from '$lib/util'
  import { started } from '$lib/stores/core'
  import { theme, createSubscriber } from '$lib/stores/theme'
  import { onMount } from 'svelte'
  import UrlPattern from 'url-pattern'

  import MainMenu from '$lib/components/MainMenu.svelte'

  import '../app.scss'

  const current_url = $page.url.pathname
  const resume_path_pattern = new UrlPattern('/resume*')

  onMount(() => {
    $started = true

    const computed = getComputedStyle(document.documentElement)

    // Normalize original values by running colors through chroma.
    const background =
      $theme.background || computed.getPropertyValue('--color-background')
    const text = $theme.text || computed.getPropertyValue('--color-text')
    const link = $theme.link || computed.getPropertyValue('--color-link')
    const highlight =
      $theme.highlight || computed.getPropertyValue('--color-highlight')

    // Track the previous theme to allow update skips.
    const previous_theme: Theme = { background, text, link, highlight }

    const subscriber = createSubscriber(document, previous_theme)
    const unsubscribe = theme.subscribe(subscriber)

    const head = document.getElementsByTagName('head')[0]
    if (!head) {
      // This should never happen, but for completeness.
      return () => {
        unsubscribe()
      }
    }

    // Load fonts via link tag injection to prevent grotesque delays.
    let stylesheet = document.createElement('link')

    stylesheet.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap'
    stylesheet.rel = 'stylesheet'

    // Temporarily set media to something inapplicable to ensure it'll fetch
    // without blocking rendering, then re-set on load.
    stylesheet.media = 'only x'
    stylesheet.addEventListener('load', () => (stylesheet.media = 'screen'))

    head.appendChild(stylesheet)

    if (!dev) {
      fillRequestIdleCallback(window)

      window.requestIdleCallback(
        () => {
          // Inject GA4.
          let script_1 = document.createElement('script')
          script_1.async = true
          script_1.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`

          head.appendChild(script_1)

          let script_2 = document.createElement('script')
          script_2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GOOGLE_MEASUREMENT_ID}')`

          head.appendChild(script_2)
        },
        { timeout: 1500 }
      )
    }

    return () => {
      unsubscribe()
    }
  })
</script>

<noscript>
  {#if !resume_path_pattern.match(current_url)}
    <div id="noscript-banner">
      <strong>NOTE:</strong> Some functionality on this site may require JavaScript
    </div>
  {/if}
</noscript>

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
