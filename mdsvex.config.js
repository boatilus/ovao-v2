import fetch from 'node-fetch'
import urls from 'rehype-urls'

/**
 * Checks for any broken links. For now, just logs an error if a URL returns
 * 404.
 *
 * @param {import('url').URL} url - The `href` attribute of the anchor.
 * @param {Node} node - The anchor node.
 */
const checkLinks = async (url, node) => {
  if (
    process.env['ENVIRONMENT'] === 'production' ||
    process.env['VERCEL_ENV'] === 'production'
  )
    if (node.tagName === 'a' && !url.href.startsWith('/')) {
      const { status } = await fetch(url.href)
      if (status === 404) {
        console.error(`link (${url}) returned 404`)
      }
    }
}

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
  extensions: ['.svelte.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    posts: './src/routes/posts/_layout.svelte'
  },
  remarkPlugins: [],
  rehypePlugins: [[urls, checkLinks]]
}

export default config
