<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit/types'
  import type { Value } from '../posts.json'

  interface LoadResponse {
    props: {
      posts: Value[]
    }
  }

  export const prerender = true

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
  export let posts: Value[]
</script>

<h1>All Posts</h1>
{#each posts as { title, date, slug, synopsis }}
  <div class="post-block">
    <div class="header-block">
      <h2><a href="/posts/{slug}" rel="prefetch">{title}</a></h2>
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
  }

  h1 {
    color: transparent;
    margin-top: -0.25em;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: hsla(
      var(--primary-hue),
      var(--highlight-sat),
      var(--highlight-lum),
      0.75
    );

    @include desktop {
      font-size: 72px;
      margin-bottom: 0.5em;
    }

    @include mobile {
      font-size: 16vw;
      margin-bottom: 0.25em;
    }
  }

  h2 {
    font-weight: normal;
    margin: 0;

    @include desktop {
      font-size: 28px;
    }

    @include mobile {
      font-size: 22px;
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
