import type { RequestHandler } from '@sveltejs/kit'
import { DOMAIN } from '$lib/variables'
import { getPosts } from '$lib/get_posts'

export const get: RequestHandler = async () => {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }

  const paths = ['', '/resume', '/works']

  const posts = await getPosts()
  for (const { slug } of posts) {
    paths.push(`/posts/${slug}`)
  }

  const locs = paths.map(
    (loc) => `<url><loc>https://www.${DOMAIN}${loc}</loc></url>`
  )

  return {
    headers,
    body: `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${locs.join('')}
    </urlset>`
  }
}
