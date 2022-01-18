<script lang="ts">
  export let src: string | string[]
  export let poster: string
  export let controls = true
  export let muted = true

  export let width = undefined
  export let height = undefined
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video {controls} {poster} {muted} {width} {height} preload="none">
  {#if Array.isArray(src)}
    {#each src as s}
      <source src={s} />
    {/each}
  {:else}
    <source {src} />
  {/if}
</video>

<style lang="scss">
  video {
    background: var(--color-background-dark);
    height: auto;
    width: 100%;
  }
</style>
