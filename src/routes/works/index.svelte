<script lang="ts" context="module">
  const HEADLINE = 'Various Works'

  const MAX_HEIGHT = 385
  const COLS = 3
  const GAP = 15
  const BORDER_WIDTH = 15
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import { flyOnce } from 'svelte-transition-extras'
  import { expoOut } from 'svelte/easing'
  import { theme } from '$lib/stores/theme'
  import { INSTAGRAM_URL } from '$lib/variables'
  import { header_fly_opts } from '$lib/constants'

  import GridImage from '$lib/components/GridImage.svelte'

  import themes from '../../themes.json'
  import images from '../../works-manifest.json'
  import { titler } from '$lib/util'

  theme.set(themes['/works*'])

  let grid: HTMLElement
  let about_modal_open = false

  $: row_heights = []

  /**
   * Given an array of images, compute the number of each that can fit along
   * a single row based on a fixed row height. Updates the values in
   * `row_heights`.
   */
  const computeItemHeights = () => {
    const { width } = grid.getBoundingClientRect()

    row_heights = []

    for (let i = 0; i < images.length; i += COLS) {
      const row = images.slice(i, i + COLS)

      const total_content_width = row.reduce((accum, current) => {
        return accum + current.base.width
      }, 0)

      const gaps = BORDER_WIDTH * COLS * 2 + GAP * (COLS - 1)
      const scale = width / (Math.floor(total_content_width) + gaps)
      const remainder = width - (total_content_width * scale + gaps)
      const derived_height = Math.floor(MAX_HEIGHT * scale + remainder / COLS)
      const clamped_height = Math.min(MAX_HEIGHT, derived_height)

      row_heights = [...row_heights, clamped_height]
    }
  }

  onMount(() => {
    computeItemHeights()
    window.addEventListener('resize', computeItemHeights)

    return () => {
      window.removeEventListener('resize', computeItemHeights)
    }
  })
</script>

<svelte:head>
  <title>{titler(HEADLINE)}</title>
</svelte:head>

<div id="works--container">
  <header>
    <h1
      in:flyOnce={{
        id: 'works-header',
        ...header_fly_opts
      }}
    >
      {HEADLINE}
    </h1>
    <button
      in:flyOnce={{
        id: 'works-about-button',
        delay: 150,
        ...header_fly_opts
      }}
      on:click={() => (about_modal_open = !about_modal_open)}
      >About
      <svg
        class:about-open={about_modal_open}
        id="works--button-chevron"
        width="14px"
        height="13px"
        viewBox="0 0 14 13"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <symbol id="chevron">
          <polygon
            points="7 6 0 0 2.42765957 0 7 3.91977077 11.5723404 0 14 0"
          />
        </symbol>
        <use id="chevron-1" href="#chevron" y="3" />
        <use id="chevron-2" href="#chevron" y="3" />
      </svg></button
    >
  </header>

  {#if about_modal_open}
    <aside
      id="works--summary"
      in:slide={{ duration: 500 }}
      out:slide={{ duration: 250 }}
    >
      <div
        id="works--summary-text"
        in:fly={{ duration: 1000, y: -20, easing: expoOut }}
        out:fly={{ duration: 350, y: -20, easing: expoOut }}
      >
        <p>
          Although I've been involved in design in various forms since I was
          young, I began a more serious foray in digital collages in 2015. My
          current aesthetic — which blends simple geometry, off-grid linework
          and patch blends of photomanipulation — was developed toward the end
          of 2017, and oriented more strongly towards the essential in 2018.
        </p>
        <p>
          Most of these are posted in modified form to
          <a href={INSTAGRAM_URL} rel="external">Instagram</a>.
        </p>
      </div>
    </aside>
  {/if}

  <section
    bind:this={grid}
    id="works--grid"
    style="--border-width: {BORDER_WIDTH}px; --row-gap: {GAP}px"
  >
    {#each images as image, i}
      <GridImage
        name={image.name}
        dominant_color={image.dominant_color}
        base_width={image.base.width}
        base_height={image.base.height}
        base={image.base}
        two_x={image['@2x']}
        three_x={image['@3x']}
        row_height={row_heights[Math.floor(i / COLS)]}
      />
    {/each}
  </section>

  <footer>
    <small>Copyright &copy; Ron Jones 2022. All rights reserved.</small>
  </footer>
</div>

<style lang="scss">
  @import './src/_core';

  #works--container {
    @include desktop {
      padding: 3em var(--horz-margin) 0 var(--horz-margin);
    }

    @include mobile {
      padding: 1em var(--horz-margin) 0 var(--horz-margin);
    }

    & > header {
      align-items: baseline;
      display: flex;
      justify-content: space-between;

      @include mobile {
        flex-direction: column;
      }

      & > h1 {
        @include large-heading;

        margin: 0;

        @include mobile {
          margin-bottom: 0.5rem;
        }
      }

      & > button {
        align-items: center;
        background: none;
        border: none;
        color: var(--color-link);
        display: flex;
        font-size: 18px;
        gap: 7px;
        padding: 0;

        #chevron-1,
        #chevron-2 {
          fill: var(--color-link);
          transition: transform 150ms;
        }

        &:hover {
          #chevron-1 {
            transform: translateY(-3px);
          }

          #chevron-2 {
            transform: translateY(3px);
          }
        }
      }
    }
  }

  #works--summary {
    --line-height-ratio: 1.5;

    left: 0;
    padding: 0 var(--horz-margin);
    position: absolute;
    text-align: justify;

    @include desktop {
      --font-size: 22px;

      background: var(--color-background);
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 0)
      );
      font-size: 22px;
      height: 50vw;
      line-height: calc(var(--font-size) * var(--line-height-ratio));
    }

    @include mobile {
      --font-size: 18px;

      background: var(--color-background);
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0)
      );
      font-size: 18px;
      line-height: calc(var(--font-size) * var(--line-height-ratio));
      padding-bottom: 6em;
    }
  }

  #works--grid {
    display: flex;
    flex-wrap: wrap;
    line-height: 0;

    @include desktop {
      padding-bottom: 5em;
      gap: var(--row-gap);
    }

    @include mobile {
      flex-direction: column;
      margin-top: 1.25em;
      padding-bottom: 3em;
      row-gap: 10px;
    }
  }

  #works--button-chevron {
    transition: transform 150ms;
  }

  footer {
    @include desktop {
      margin-bottom: 2em;
      opacity: 0.6;
      text-align: right;
    }

    @include mobile {
      margin-top: 3em;
      margin-bottom: 1em;
      opacity: 0.75;
      text-align: center;
    }

    & > small {
      font-size: 14px;
    }
  }

  .about-open {
    transform: rotate(180deg);
  }
</style>
