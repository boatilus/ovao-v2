import type { RequestHandler } from '@sveltejs/kit'
import { getPosts } from '$lib/get_posts'

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
