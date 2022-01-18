<script lang="ts">
  const onHover = () => {
    if (!window) {
      return
    }

    window.setTimeout(() => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(
        '--color-text'
      )
      document.body.style.setProperty('color', color)
    }, 1500)
  }
</script>

<a href="/posts/internal/set-yellow" sveltekit:prefetch on:mouseenter={onHover}
  >Hover over me!</a
>

<style>
  a {
    background: var(--color-highlight);
    border-radius: 3px;
    color: var(--color-link);
    display: inline-block;
    padding: 0.4em 1em;
    text-decoration: none;
  }
</style>
