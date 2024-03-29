<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit/types'
  import type { Value } from '../posts.json'

  interface LoadResponse {
    props: {
      posts: Value[]
    }
  }

  export const load: Load = async ({ fetch }): Promise<LoadResponse> => {
    const url = `/posts.json`
    const res = await fetch(url)
    if (!res.ok) {
      console.error(res.status)
    }

    try {
      let posts = (await res.json()) as Value[]

      return {
        props: { posts }
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<script lang="ts">
  import { titler } from '$lib/util'
  import { flyOnce } from 'svelte-transition-extras'
  import { header_fly_opts } from '$lib/constants'

  export let posts: Value[]
</script>

<svelte:head>
  <title>{titler('All Posts')}</title>
</svelte:head>

<h1 in:flyOnce={{ id: 'posts-index-header', ...header_fly_opts }}>All Posts</h1>
{#each posts as { title, date, slug, synopsis }}
  <div class="post-block">
    <div class="header-block">
      <h2><a href="/posts/{slug}" sveltekit:prefetch>{title}</a></h2>
      <time datetime={date}
        >{new Date(Date.parse(date)).toLocaleDateString('en-US')}</time
      >
    </div>
    {#if synopsis}
      <p class="synopsis">{synopsis}</p>
    {/if}
  </div>
{/each}

<style lang="scss">
  @import './src/_core';

  h1,
  .post-block {
    @include mobile {
      margin: 0 10px;
    }
  }

  .post-block {
    margin-bottom: 3em;

    @include mobile {
      border-bottom: 1px solid var(--color-subdued);
      margin-bottom: 1.5em;
      padding-bottom: 1.5em;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  h1 {
    @include large-heading;

    color: transparent;
    font-weight: 500;
    -webkit-text-stroke-color: hsla(
      var(--primary-hue),
      var(--highlight-sat),
      var(--highlight-lum),
      0.75
    );

    @include desktop {
      margin-bottom: 0.25em;
      -webkit-text-stroke-width: 2px;
    }

    @include mobile {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      -webkit-text-stroke-width: 1.5px;
    }
  }

  h2 {
    font-weight: normal;
    margin: 0;

    @include desktop {
      font-size: 28px;
    }

    @include mobile {
      font-size: 20px;
    }

    a {
      text-decoration: underline;
      text-decoration-color: var(--color-highlight);
      text-decoration-thickness: 2px;
      text-underline-offset: 0.2em;
      text-decoration-skip-ink: all;
    }
  }

  .header-block {
    align-items: baseline;
    display: flex;
    gap: 1em;

    @include mobile {
      flex-direction: column;
    }

    time {
      background: hsla(var(--primary-hue), 50%, 32.5%);
      border-radius: 500px;
      color: var(--color-highlight);
      cursor: default;
      padding: 0.1em 0.75em;
    }
  }

  .synopsis:after {
    content: '...';
  }
</style>
