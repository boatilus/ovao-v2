<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ params, fetch }) => {
    const { org } = params

    const res = await fetch(`/api/${org}.json`)
    if (!res.ok) {
      return {
        status: 303, // See Other
        maxage: 0,
        redirect: '/resume'
      }
    }

    try {
      const { title, skills, show_quickbooks_cert } = await res.json()

      return {
        props: {
          title,
          skills,
          show_quickbooks_cert
        }
      }
    } catch (error) {
      console.error(error)
    }

    return {
      props: {
        title: org
      }
    }
  }
</script>

<script lang="ts">
  import Resume from '$lib/components/Resume.svelte'

  export let title: string
  export let skills: string[]
  export let show_quickbooks_cert: boolean
</script>

<Resume {title} {skills} {show_quickbooks_cert} />
