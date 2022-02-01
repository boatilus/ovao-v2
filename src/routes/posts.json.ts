import type { RequestHandler } from '@sveltejs/kit'
import { getPosts } from '$lib/get_posts'

/**
 * Describes the data for an individual post, which is comprised of both
 * post metadata and data from the post's frontmatter.
 */
export interface Value {
  filename: string
  title: string
  date: string
  slug: string
  synopsis?: string
}

export const get: RequestHandler = async () => {
  const posts = await getPosts()
  if (posts.length === 0) {
    return {
      status: 404
    }
  }

  return {
    body: posts
  }
}
