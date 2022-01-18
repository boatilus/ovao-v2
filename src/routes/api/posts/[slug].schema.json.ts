import type { RequestHandler } from '@sveltejs/kit'
import type { BlogPosting, WithContext } from 'schema-dts'
import { DOMAIN } from '$lib/variables'
import { person } from '$lib/util/schema'
import { readFile } from 'fs/promises'
import path from 'path'
import { base } from '$app/paths'
import matter from 'gray-matter'
import { wordCount } from 'split-word'

export const get: RequestHandler = async ({ params }) => {
  const { slug } = params
  const filepath = path.join(base, 'src', 'routes', 'posts', `${slug}.svelte.md`)

  try {
    const file = await readFile(filepath, 'utf-8')
    const { data, content } = matter(file)

    const schema: WithContext<BlogPosting> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://${DOMAIN}/posts/${slug}`
      },
      headline: data?.title,
      author: person,
      datePublished: data?.date,
      inLanguage: 'en-US',
      description: data?.description,
      keywords: data?.tags.map((tag: string) => tag.toLowerCase()).join(', '),
      wordCount: wordCount(content)
      // articleBody: content -- TODO: We're not quite ready to run through the AST to deal with this.
    }

    return {
      body: JSON.stringify(schema, null, '  ')
    }
  } catch (err) {
    return {
      status: 500,
      body: err
    }
  }
}
