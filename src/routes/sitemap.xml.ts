import type { RequestHandler } from '@sveltejs/kit'
import { DOMAIN } from '$lib/variables'

export const get: RequestHandler = async () => {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  }

  const paths = ['', '/resume', '/works']

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
