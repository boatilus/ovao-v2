<script lang="ts">
  interface ImageTypeData {
    hash: string
  }

  interface ImageVariant {
    width: number
    height: number
    webp?: ImageTypeData
    jpg?: ImageTypeData
  }

  export let name: string
  export let base: ImageVariant
  export let two_x: ImageVariant
  export let three_x: ImageVariant
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
    /images/works/{name}+{three_x.webp.hash}@3x.webp 3x,
    /images/works/{name}+{two_x.webp.hash}@2x.webp 2x,
    /images/works/{name}+{base.webp.hash}.webp"
  />
  <source
    type="image/jpeg"
    srcset="
    /images/works/{name}+{three_x.jpg.hash}@3x.jpg 3x,
    /images/works/{name}+{two_x.jpg.hash}@2x.jpg 2x,
    /images/works/{name}+{base.jpg.hash}.jpg"
  />
  <img
    src="/images/works/{name}+{base.jpg.hash}.jpg"
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
