<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'
  import UrlPattern from 'url-pattern'

  export const prerender = true

  const pattern = new UrlPattern('/posts/:slug')

  export const load: Load = async ({ url, fetch }) => {
    const match = pattern.match(url.pathname)
    if (!match?.slug) {
      return {
        props: {
          schema: null
        }
      }
    }

    const res = await fetch(`/api/posts/${match.slug}.schema.json`)
    if (!res.ok) {
      return {
        status: res.status,
        error: res.statusText
      }
    }

    try {
      const schema = await res.json()
      return {
        props: {
          schema
        }
      }
    } catch (err) {
      return {
        status: 500,
        error: err
      }
    }
  }
</script>

<script lang="ts">
  import type { BlogPosting, WithContext } from 'schema-dts'
  import { theme } from '$lib/stores/theme'

  import './global.scss'
  import themes from '../../themes.json'
  import { serialize } from '$lib/util/schema'

  theme.set(themes['/posts*'])

  export let schema: WithContext<BlogPosting>
</script>

<svelte:head>
  {#if schema}
    {@html serialize(schema)}
  {/if}
</svelte:head>

<div id="posts--container">
  <slot />
</div>

<style lang="scss">
  @import './src/_core';

  #posts--container {
    @include desktop {
      margin: 0 4vw;
    }
  }
</style>
