---
title: Use Global Styling in SvelteKit Cautiously
date: 2021-12-29
tags: [tech, Svelte, JavaScript, UI]
---

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  import GlobalSwitchButton from '$lib/components/posts/GlobalSwitchButton.svelte'
</script>

In Svelte, due its to scoped-by-default approach to component styling, it can be tempting to reach for the [`:global`](https://svelte.dev/docs#style) modifier when trying to override styles on subcomponents, or whenever a general style override is needed. Within relatively small trees of components, this approach is generally pretty reasonable.

In SvelteKit, however, with its ability to [prefetch routes](https://kit.svelte.dev/docs#anchor-options-sveltekit-prefetch) (and thereby component styles), `:global` can be a significant footgun. Take this (heavily contrived) example:

<CodeBlock filename="route-1.svelte" lang="svelte" escape-content>
  <h1>Route 1</h1>
  <a href="/route-2" sveltekit:prefetch>Link to route 2</a>
</CodeBlock>

<CodeBlock filename="route-2.svelte" lang="svelte" escape-content>
  <h1>Route 2</h1>

  <style>
    :global(h1) {
      color: yellow;
    }
  </style>
</CodeBlock>

Here, we've set up a couple routes --- `route-1.svelte` and `route-2.svelte` --- linking from the former to the latter via a link tagged with `sveltekit:prefetch`. When hovering over the link, SvelteKit's prefetcher loads `route-2`'s required chunks (including stylesheets), thereby implicitly applying any global styles set in `route-2.svelte`. As a result, we'll see the color of our `<h1>` preemptively shift to `yellow` --- before we actually navigate to the route.

If you'd like to see this behavior in action, hover over the following button: (The styles will revert back in a couple seconds.)

<GlobalSwitchButton />

> ### Note
> This occurs also with programmatic prefetching via [`$app/navigation`](https://kit.svelte.dev/docs#modules-$app-navigation)'s `prefetch` and `prefetchRoutes` functions, and similarly when importing stylesheets into components.

As a workaround, when you need to reach for `:global`, scope your selectors more narrowly, or consider wrapping your content in an element you can scope your styles to:

<CodeBlock filename="route-2-fixed.svelte" lang="svelte" escape-content>
  <div id="container">
    <h1>Route 2</h1>
  </div>

  <style>
    :global(#container > h1) {
      color: yellow;
    }
  </style>
</CodeBlock>

While use of `:global` is sometimes necessary -- not unlike setting `!important` on a style property -- my experience has been that its use in SvelteKit apps is best avoided where possible. Where it _is_ needed, take steps to make sure you're scoping the selector as narrowly as possible to avoid trampling existing styles.