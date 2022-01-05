<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit/types'

  export const load: Load = async () => {
    return {
      status: 302,
      redirect: 'https://github.com/boatilus'
    }
  }
</script>
