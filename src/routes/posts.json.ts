import type { RequestHandler } from '@sveltejs/kit'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export interface Value {
  title: string
  slug: string
  date: string
  synopsis?: string
}

const path = join('.', 'src', 'routes', 'posts')
const ext_regex = new RegExp(/\.[^/.]+$/)

export const get: RequestHandler = async () => {
  const entries = await readdir(path, { withFileTypes: true })
  if (!entries || entries.length === 0) {
    // no posts, 404?
    return {
      status: 404
    }
  }

  const posts = await Promise.all(
    entries
      // We only care about files that end in .md (or .svelte.md).
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map(async ({ name }) => {
        try {
          const full_path = join(path, name)
          const file = await readFile(full_path, 'utf8')
          const { data, content } = matter(file)
          const parts = name.split('.')

          return {
            filename: name,
            title: data['title'],
            date: data['date'],
            slug: parts[0]
          }
        } catch (err) {
          console.error(JSON.stringify(err))
        }
      })
  )

  // Sort posts in date-descending order.
  posts.sort((a, b) => b.date - a.date)

  return {
    body: posts
  }
}
