---
title: Hello world
---

<script>
  import CodeViewer from '$lib/components/CodeViewer.svelte'
  import CodeBlock from '$lib/components/CodeBlock.svelte'
</script>

So, here's a paragraph.

<CodeViewer>
  <CodeBlock @escape lang="ts">
    export const get: RequestHandler = async ({ params }) => {
      const { slug } = params
      const post = await readFile(`./static/_posts/$\{slug\}.md`, 'utf8')
    }
  </CodeBlock>

  <CodeBlock lang="ts">
    const func = async (bagel: string) => {
      return 'oh fuck'
    }
  </CodeBlock>
</CodeViewer>
