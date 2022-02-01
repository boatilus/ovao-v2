<script lang="ts" context="module">
  import { writable } from 'svelte/store'

  /**
   * A writable store that tracks whether the CAPTCHA has been previously
   * solved, persisted to the session store.
   */
  export const solved = writable(
    typeof window !== 'undefined'
      ? sessionStorage.getItem('captcha_solved')
      : 'false'
  )

  solved.subscribe((value) => {
    if (typeof window !== 'undefined' && value === 'true') {
      window.sessionStorage.setItem('captcha_solved', 'true')
    }
  })

  interface Shape {
    name: string
    shape: string
    width?: number
  }

  const SHAPES = [
    {
      name: 'circle',
      shape: '<circle cx="35" cy="35" r="35"/>'
    },
    {
      name: 'triangle',
      shape:
        '<path d="M43,0.955259274 L85.106055,69.5 L0.893944983,69.5 L43,0.955259274 Z" />',
      width: 86
    },
    {
      name: 'square',
      shape: '<rect width="70" height="70" />'
    },
    {
      name: 'pentagon',
      shape:
        '<polygon points="34 0 67.2869781 24.1844052 54.5724838 63.3155948 13.4275162 63.3155948 0.71302193 24.1844052" />'
    },
    {
      name: 'hexagon',
      shape:
        '<polygon points="31 0 61.3108891 17.5 61.3108891 52.5 31 70 0.689110868 52.5 0.689110868 17.5" />',
      width: 64
    }
  ]
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import { randBetween, shuffle } from '$lib/util'
  import disableScroll from 'disable-scroll'
  import hotkeys from 'hotkeys-js'

  const dispatch = createEventDispatcher()

  export let show = false

  $: if (show && !$solved) {
    if (typeof window !== 'undefined') {
      disableScroll.on()
    }
  } else if (show === false) {
    if (typeof window !== 'undefined') {
      disableScroll.off()
    }
  }

  let options: Shape[] = []
  let desired_option: string

  onMount(() => {
    // Clone `SHAPES` and pluck three items after shuffling.
    options = [...SHAPES]
    shuffle(options)
    options = options.splice(0, options.length - 2)

    desired_option = options[randBetween(0, 2)].name

    hotkeys('esc', () => (show = false))
  })
</script>

{#if show && !$solved}
  <div
    id="captcha--overlay"
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 150 }}
  />
  <div id="captcha--container">
    <div
      id="captcha--modal"
      in:fly={{ y: 8, duration: 500 }}
      out:fade={{ duration: 150 }}
    >
      <button id="captcha--close" on:click={() => (show = false)}>
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <line x1="0" y1="0" x2="14" y2="14" />
          <line x1="14" y1="0" x2="0" y2="14" />
        </svg>
      </button>
      <h1>Are you a human?</h1>
      <h2>Select the {desired_option}</h2>
      <div id="captcha--shapes">
        {#each options as { name, shape, width }}
          <button
            on:click={() => {
              if (name === desired_option) {
                solved.set('true')
                show = false
                dispatch('answered')
              }
            }}
          >
            <svg width={width || 70} height="70">
              {@html shape}
            </svg>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import './src/_core';

  #captcha--overlay {
    background-color: var(--color-background);
    opacity: 0.9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  #captcha--container {
    --opacity-hover: 0.7;
    --opacity-active: 0.4;
    --transition-time: 200ms;

    align-items: center;
    display: flex;
    position: fixed;
    justify-content: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
  }

  #captcha--modal {
    background: black;
    border-radius: var(--border-radius-standard);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.24),
      0 10px 15px -3px rgba(0, 0, 0, 0.2);
    text-align: center;

    @include mobile {
      width: 100%;
    }

    h1 {
      color: white;
      font-weight: normal;
      margin: 0.5em 0 0 0;

      @include mobile {
        font-size: 1.6em;
      }
    }

    h2 {
      font-weight: normal;
      color: rgba(white, 0.7);
      margin: 0;
      text-align: center;

      @include mobile {
        font-size: 1.2em;
      }
    }
  }

  #captcha--close {
    background: transparent;
    display: flex;
    align-items: center;
    position: absolute;
    border: 0;
    padding: 10px;
    transition: opacity var(--transition-time);

    line {
      stroke: white;
      stroke-width: 2px;
    }

    &:active {
      opacity: var(--opacity-active);
    }

    &:hover {
      opacity: var(--opacity-hover);
    }
  }

  #captcha--shapes {
    justify-content: center;
    display: flex;
    gap: 30px;

    @include desktop {
      margin: 2em 7em 2em 7em;
    }

    @include mobile {
      margin: 2em 0;
    }

    button {
      background: none;
      border: none;
      height: 70px;
      margin: 0;
      padding: 0;
      overflow: visible;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;

      &:hover {
        :global(circle),
        :global(polygon),
        :global(rect),
        :global(path) {
          opacity: var(--opacity-hover);
        }
      }

      &:active {
        :global(circle),
        :global(polygon),
        :global(rect),
        :global(path) {
          opacity: var(--opacity-active);
        }
      }
    }

    svg {
      cursor: pointer;
    }
  }

  :global(#captcha--modal circle),
  :global(#captcha--modal polygon),
  :global(#captcha--modal rect),
  :global(#captcha--modal path) {
    fill: white;
    transition: opacity var(--transition-time);
  }
</style>
