<script lang="ts" context="module">
  export const load = ({ error, status }) => {
    return {
      props: {
        status,
        title: `${status}: ${error.message}`
      }
    }
  }
</script>

<script lang="ts">
  import { titler } from '$lib/util'
  import { theme } from '$lib/stores/theme'

  import themes from '../themes.json'

  theme.set(themes['/'])

  export let title: string
  export let status: string
</script>

<svelte:head>
  <title>{titler(title)}</title>
</svelte:head>

<h1>Error {status}</h1>

<style lang="scss">
  @import './src/_core.scss';

  h1 {
    cursor: default;
    font-size: 24vw;
    letter-spacing: -0.5rem;
    margin: 0;
    overflow: hidden;
    opacity: 0.3;
    text-overflow: clip;
    text-rendering: geometricPrecision;
    white-space: nowrap;

    @include mobile {
      margin-top: 0.5em;
    }

    @supports (-webkit-text-stroke: 2px white) {
      -webkit-text-stroke: 2px var(--color-text);
      -webkit-text-fill-color: transparent;
    }
  }
</style>
