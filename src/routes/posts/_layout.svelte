<script>
  import { fly } from 'svelte/transition'
  import { titler } from '$lib/util'

  export let title
  export let date
  export let tags
  export let description

  let copyright_year = new Date().getFullYear()

  if (date) {
    const posting_year = new Date(date).getFullYear()
    if (copyright_year !== posting_year) {
      // @ts-ignore
      copyright_year = `${posting_year} - ${copyright_year}`
    }
  }

  // @ts-ignore
  if (!description || description.length > 160) {
    // We want a build warning if a post is missing a description, as we
    // want it for the <meta> tag.
    console.warn(`no description provided for "${title}", or > 160 chars`)
  }
</script>

<svelte:head>
  {#if title}
    <title>{titler(title)}</title>
  {/if}
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
    rel="stylesheet"
  />
  <meta property="og:title" content={title} />
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

<header>
  <a
    href="/posts"
    sveltekit:prefetch
    in:fly={{ x: -10, duration: 600, delay: 250 }}
  >
    <svg
      width="19px"
      height="20px"
      viewBox="0 0 19 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M18,10 L2,10 M18.68,10 L11,2.32 M18.68,10 L11,17.68"
        stroke-width="2"
        transform="translate(10.500000, 10.000000) rotate(-180.000000) translate(-10.500000, -10.000000)"
      />
    </svg> All posts</a
  >
</header>

<article id="post--article">
  <h1>{title}</h1>
  <slot />

  <footer>
    {#if date}
      <div>
        Dated: <time>{new Date(date).toLocaleDateString('en-US')}</time>
      </div>{/if}
    {#if tags}
      <div id="post--footer-tags">
        Tagged: <ul class="tags">
          {#each tags.sort() as tag}
            <li>{tag}</li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="copyright">
      <small>Copyright &copy; {copyright_year} Ron Jones</small>
    </div>
  </footer>
</article>

<style lang="scss">
  @import './src/_core';

  header {
    display: flex;
    height: 62px;

    @include mobile {
      border-bottom: 1px solid hsl(258, 34%, 32%);
      padding: 0 var(--horz-margin);
    }
  }

  header a {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    letter-spacing: 3px;
    text-transform: uppercase;

    @include desktop {
      font-size: 14px;
    }

    @include mobile {
      color: var(--color-highlight);
      font-size: 12px;
    }
  }

  header a > svg {
    transition: transform 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  header a > svg path {
    transition: stroke 200ms linear;
  }

  svg > path {
    stroke: var(--color-highlight);
  }

  header a:hover svg {
    transform: translateX(-5px);
  }

  header a:hover path {
    stroke: var(--color-link);
  }

  article {
    font-size: var(--font-size);
    -webkit-font-smoothing: antialiased;

    @include desktop {
      --font-size: 18px;
      --font-size-mono: 15px;

      padding-top: 1em;
      width: 60em;
    }

    @include mobile {
      --font-size: 16px;
      --font-size-mono: 14px;

      padding: 1em 0 1em;
      width: 100%;
    }
  }

  article h1 {
    color: var(--color-highlight);
    cursor: default;
    font-weight: 500;
    letter-spacing: -2.4px;
    margin: 0 0 0.5em 0;
    opacity: 0.75;

    @include desktop {
      font-size: 48px;
    }

    @include mobile {
      font-size: 30px;
      padding: 0 var(--horz-margin);
    }
  }

  article > footer {
    --title-padding: 0.5em;

    border-top: 1px solid var(--color-subdued-text);
    font-size: 16px;
    opacity: 1;

    @include desktop {
      margin-top: 5em;
      padding-bottom: 1em;
    }

    @include mobile {
      margin-top: 4em;
      padding: 0 var(--horz-margin);
    }
  }

  article > footer div {
    margin: 0.5em 0;
  }

  article > footer time {
    color: var(--color-subdued-text);
    margin-left: var(--title-padding);
  }

  #post--footer-tags {
    display: inline-flex;
  }

  article > footer .tags {
    list-style: none;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4em;
    margin: 0 0 0 var(--title-padding);
    padding: 0;
  }

  article > footer .tags li {
    border: 1px solid var(--color-subdued-text);
    border-radius: 100px;
    color: var(--color-subdued-text);
    cursor: default;
    display: inline;
    padding: 0.15em 0.65em;
  }

  article > footer .copyright {
    margin-top: 3em;
  }

  article > footer .copyright small {
    color: var(--color-subdued-text);
    font-size: 14px;
  }
</style>
