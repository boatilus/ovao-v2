<script lang="ts">
  import type { Theme } from '$lib/stores/theme'
  import { dev } from '$app/env'
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
  {#if !dev}
    <script async>
      ;(function (window, document, dataLayerName, id) {
        ;(window[dataLayerName] = window[dataLayerName] || []),
          window[dataLayerName].push({
            start: new Date().getTime(),
            event: 'stg.start'
          })
        var scripts = document.getElementsByTagName('script')[0],
          tags = document.createElement('script')
        function stgCreateCookie(a, b, c) {
          var d = ''
          if (c) {
            var e = new Date()
            e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3),
              (d = '; expires=' + e.toUTCString())
          }
          document.cookie = a + '=' + b + d + '; path=/'
        }
        var isStgDebug =
          (window.location.href.match('stg_debug') ||
            document.cookie.match('stg_debug')) &&
          !window.location.href.match('stg_disable_debug')
        stgCreateCookie('stg_debug', isStgDebug ? 1 : '', isStgDebug ? 14 : -1)
        var qP = []
        dataLayerName !== 'dataLayer' &&
          qP.push('data_layer_name=' + dataLayerName),
          isStgDebug && qP.push('stg_debug')
        var qPString = qP.length > 0 ? '?' + qP.join('&') : ''
        ;(tags.async = !0),
          (tags.src =
            'https://ovao.containers.piwik.pro/' + id + '.js' + qPString),
          scripts.parentNode.insertBefore(tags, scripts)
        !(function (a, n, i) {
          a[n] = a[n] || {}
          for (var c = 0; c < i.length; c++)
            !(function (i) {
              ;(a[n][i] = a[n][i] || {}),
                (a[n][i].api =
                  a[n][i].api ||
                  function () {
                    var a = [].slice.call(arguments, 0)
                    'string' == typeof a[0] &&
                      window[dataLayerName].push({
                        event: n + '.' + i + ':' + a[0],
                        parameters: [].slice.call(arguments, 1)
                      })
                  })
            })(i[c])
        })(window, 'ppms', ['tm', 'cm'])
      })(window, document, 'dataLayer', 'b2acc90b-7fb0-4a4e-bb74-1cc80c82a685')
    </script>
  {/if}
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
