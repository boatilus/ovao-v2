<script lang="ts">
  import { DOMAIN, TITLE } from '$lib/variables'
  import { titler } from '$lib/util'

  export let title: string
  export let description: string

  export let noindex = false
  export let nofollow = false
  export let keywords: string = undefined
  export let canonical: string = undefined
  export let openGraph = undefined
  export let twitter = undefined

  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ')
</script>

<svelte:head>
  <title>{titler(title)}</title>

  <meta name="description" content={description} />
  <meta name="robots" content={robots} />
  <meta name="googlebot" content={robots} />

  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  {#if openGraph}
    {#if openGraph.type}
      <meta property="og:type" content={openGraph.type.toLowerCase()} />
    {/if}

    <meta property="og:title" content={openGraph?.title || title} />

    <meta
      property="og:description"
      content={openGraph?.description || description}
    />

    <meta property="og:site_name" content={TITLE} />

    {#if openGraph.url || canonical}
      <meta property="og:url" content={openGraph.url || canonical} />
    {/if}

    {#if openGraph.article}
      <meta property="article:author" content="https://{DOMAIN}" />

      {#if openGraph.article.publishedTime}
        <meta
          property="article:published_time"
          content={openGraph.article.publishedTime}
        />
      {/if}

      {#if openGraph.article.modifiedTime}
        <meta
          property="article:modified_time"
          content={openGraph.article.modifiedTime}
        />
      {/if}

      {#if openGraph.article.expirationTime}
        <meta
          property="article:expiration_time"
          content={openGraph.article.expirationTime}
        />
      {/if}

      {#if openGraph.article.section}
        <meta property="article:section" content={openGraph.article.section} />
      {/if}

      {#if openGraph.article.tags && openGraph.article.tags.length}
        {#each openGraph.article.tags as tag}
          <meta property="article:tag" content={tag} />
        {/each}
      {/if}
    {/if}

    {#if openGraph.images && openGraph.images.length}
      {#each openGraph.images as image}
        <meta property="og:image" content={image.url} />
        {#if image.alt}
          <meta property="og:image:alt" content={image.alt} />
        {/if}
        {#if image.width}
          <meta property="og:image:width" content={image.width.toString()} />
        {/if}
        {#if image.height}
          <meta property="og:image:height" content={image.height.toString()} />
        {/if}
      {/each}
    {/if}
  {/if}

  {#if twitter}
    <meta name="twitter:title" content={twitter?.title || title} />

    <meta
      name="twitter:description"
      content={twitter?.description || description}
    />

    <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
    {#if twitter.site}
      <meta name="twitter:site" content={twitter.site} />
    {/if}
    {#if twitter.image}
      <meta name="twitter:image" content={twitter.image} />
    {/if}
    {#if twitter.imageAlt}
      <meta name="twitter:image:alt" content={twitter.imageAlt} />
    {/if}
    {#if twitter.player}
      <meta name="twitter:player" content={twitter.player} />
    {/if}
    {#if twitter.playerWidth}
      <meta name="twitter:player:width" content={twitter.playerWidth} />
    {/if}
    {#if twitter.playerHeight}
      <meta name="twitter:player:height" content={twitter.playerHeight} />
    {/if}
  {/if}

  <slot />
</svelte:head>
