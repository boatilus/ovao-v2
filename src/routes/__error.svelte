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

  import ErrorPage from '$lib/components/ErrorPage.svelte'

  theme.set(themes['/'])

  export let title: string
  export let status: string
</script>

<svelte:head>
  <title>{titler(title)}</title>
</svelte:head>

<ErrorPage {status} />
