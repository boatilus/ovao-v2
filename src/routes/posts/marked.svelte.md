---
title: Be Wary of :global Styling in SvelteKit
---

<script>
  import CodeViewer from '$lib/components/CodeViewer.svelte'
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import Note from '$lib/components/Note.svelte'
</script>

In Svelte, due its to scoped-by-default approach to component styling, it can be tempting to reach for the [`:global`](https://svelte.dev/docs#style) modifier when styling subcomponents, or whenever a general style override is needed. Within relatively small trees of components themselves, this approach is generally pretty reasonable.

In SvelteKit, however, with its ability to [prefetch routes](https://kit.svelte.dev/docs#anchor-options-sveltekit-prefetch) (and thereby component styles), `:global` can be a significant footgun. Take this (heavily contrived) example:

<CodeViewer>
  <CodeBlock @escape lang="ts">
    export const get: RequestHandler = async ({ params }) => {
      const { slug } = params
      const post = await readFile(`./static/_posts/$\{slug\}.md`, 'utf8')

      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    }

  </CodeBlock>

  <CodeBlock lang="ts" filename="component2.svelte">
    const func = async (bagel: string) => {
      return 'oh fuck'
    }
  </CodeBlock>
</CodeViewer>

So, what happened here? For any anchor tagged with the `sveltekit:prefetch` attribute, SvelteKit's runtime will not only fetch any chunks associated with that route, but will also apply any styles specified within those fetched chunks.

Again, given Svelte's scoped-by-default styles, this is usually pretty innocuous. With global style overrides, however, any prefetched styles will be applied universally to any elements whose selector matches that specified in `:global` (in this example case, the `body` element), even without executing navigation to the prefetched route.

This occurs also with programmatic prefetching via [`$app/navigation`](https://kit.svelte.dev/docs#modules-$app-navigation)'s `prefetch` and `prefetchRoutes` functions (which [this REPL](#) demonstrates).

<Note>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Note>

While use of `:global` is sometimes necessary -- not unlike the `!important` property on a style property -- my experience has been that its use in SvelteKit apps is best avoided where possible. Where it _is_ needed, take steps to make sure you're scoping the selector as narrowly as possible to avoid trampling existing styles.
