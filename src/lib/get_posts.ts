import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

interface Value {
  filename: string
  title: string
  slug: string
  date: any
  synopsis?: string
}

const path = join('.', 'src', 'routes', 'posts')

/** 
 * Iterates through .svelte.md files in the routes/posts directory, returning
 * post metadata from the frontmatter as an array.
 */
export const getPosts = async () => {
  const entries = await readdir(path, { withFileTypes: true })
  if (!entries || entries.length === 0) {
    return []
  }

  const posts = await Promise.all(
    entries
      // We only care about files that end in .md (or .svelte.md).
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map(async ({ name }) => {
        try {
          const full_path = join(path, name)
          const file = await readFile(full_path, 'utf8')
          const { data } = matter(file)
          const parts = name.split('.')

          return {
            filename: name,
            title: data['title'] as string,
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

  return posts
}
