---
title: Example Post
date: 2022-01-06
---

<script>
  import CodeViewer from '$lib/components/CodeViewer.svelte'
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import Note from '$lib/components/Note.svelte'
</script>

Example paragraph.

<CodeViewer>
  <CodeBlock @escape lang="ts" filename="example1.ts">
    export const get: RequestHandler = async ({ params }) => {
      const { slug } = params
      const post = await readFile(`./static/_posts/$\{slug\}.md`, 'utf8')
    }
  </CodeBlock>

  <CodeBlock lang="ts" filename="example2.ts">
    const func = async (bagel: string) => {
      return 'oh dang'
    }
  </CodeBlock>
</CodeViewer>

<Note>
  Example note.
</Note>
