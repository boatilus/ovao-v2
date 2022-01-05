<script lang="ts">
  export let name: string
  export let base_width: number
  export let base_height: number
  export let row_height: number
  export let dominant_color: string

  $: computed_width = base_width * (row_height / base_height)
</script>

<picture>
  <source
    type="image/webp"
    srcset="
    /images/works/{name}@3x.webp 3x,
    /images/works/{name}@2x.webp 2x,
    /images/works/{name}.webp 1x"
  />
  <source
    type="image/jpeg"
    srcset="
    /images/works/{name}@3x.jpg 3x,
    /images/works/{name}@2x.jpg 2x,
    /images/works/{name}.jpg 1x"
  />
  <img
    src="/images/works/{name}.jpg"
    height={row_height}
    width={computed_width}
    alt={name}
    style="background-color: {dominant_color}; height: {row_height}px; width: {computed_width}px"
  />
</picture>

<style lang="scss">
  @import './src/_core';

  img {
    @include desktop {
      border: var(--border-width) solid var(--color-text);
      height: auto;
      width: auto;
    }

    @include mobile {
      border: 10px solid var(--color-text);
      box-sizing: border-box;
      height: auto !important;
      width: 100% !important;
    }
  }
</style>
