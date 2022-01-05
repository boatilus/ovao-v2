<script lang="ts">
  import { onMount } from 'svelte'

  export let href: string
  export let prefetch = false
  export let rel = ''

  let anchor_element: HTMLAnchorElement
  let height = 0
  let width = 0
  let font_size: string

  onMount(() => {
    const rect = anchor_element.getBoundingClientRect()

    width = rect.width
    height = rect.height

    const computed_style = window.getComputedStyle(anchor_element)
    font_size = computed_style.getPropertyValue('font-size')
  })
</script>

<a
  bind:this={anchor_element}
  {href}
  {rel}
  sveltekit:prefetch={prefetch ? undefined : true}
>
  <span
    class="after"
    style="--offset: -{width}px; --height: {height}px; --width: {width}px; --font-size: {font_size}"
    ><slot /></span
  >
  <slot />
</a>

<style lang="scss">
  a {
    text-decoration: none;
    white-space: nowrap;
    text-shadow: -3px -3px var(--background-color),
      -3px 3px var(--background-color), 3px -3px var(--background-color),
      3px 3px var(--background-color);

    background-size: 2px var(--font-size);
    box-shadow: inset 0 -0.1rem var(--background-color),
      inset 0 -0.2rem var(--color-highlight);
    display: inline;

    &:after {
      content: inherit;
    }

    .after {
      background-color: var(--background-color);
      color: var(--color-highlight);
      display: inline;
      height: calc(var(--height) + 1px);
      position: absolute;
      overflow: hidden;
      text-overflow: clip;
      text-shadow: -3px -3px var(--background-color),
        -3px 3px var(--background-color), 3px -3px var(--background-color),
        3px 3px var(--background-color);
      box-shadow: inset 0 0 var(--color-highlight),
        inset 0 -1px var(--color-highlight);
      transition: width 160ms ease-in-out;
      width: 0;
      // mask-image: linear-gradient(90deg, white var(--width), transparent 100px);
      // -webkit-mask-image: linear-gradient(90deg, white var(--width), transparent 100px);0;
      // }
    }

    &:hover .after {
      width: var(--width);
    }
  }
</style>
