---
title: Hello world
---

<script>
  import CodeViewer from '$lib/components/CodeViewer.svelte'
  import CodeBlock from '$lib/components/CodeBlock.svelte'
  import Note from '$lib/components/Note.svelte'
</script>

Posuere lorem ipsum dolor sit amet consectetur adipiscing. Pellentesque elit eget gravida cum sociis natoque penatibus. Eget nunc lobortis mattis aliquam faucibus. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Etiam sit amet nisl purus in mollis. Massa tempor nec feugiat nisl pretium fusce. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Fames ac turpis egestas sed. Montes nascetur ridiculus mus mauris. And [here's a link](https://google.com).

<CodeViewer>
  <CodeBlock @escape lang="ts">
    export const get: RequestHandler = async ({ params }) => {
      const { slug } = params
      const post = await readFile(`./static/_posts/$\{slug\}.md`, 'utf8')
    }
  </CodeBlock>

  <CodeBlock lang="ts" filename="component2.svelte">
    const func = async (bagel: string) => {
      return 'oh fuck'
    }
  </CodeBlock>
</CodeViewer>

<Note>Some note about something</Note>
