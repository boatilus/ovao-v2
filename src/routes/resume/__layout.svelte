<script lang="ts" context="module">
  import { person } from '$lib/util/schema'
  import { serialize } from '$lib/util/schema'
</script>

<script lang="ts">
  import { theme } from '$lib/stores/theme'
  import themes from '../../themes.json'

  theme.set(themes['/resume*'])
</script>

<svelte:head>
  <title>Résumé - Ron Jones</title>
  {@html serialize(person)}
</svelte:head>

<slot />

<style lang="scss">
  @import './src/_core';

  @media print {
    :global(body) {
      background-color: transparent;
    }
  }
</style>
