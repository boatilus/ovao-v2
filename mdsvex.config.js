import fetch from 'node-fetch'
import urls from 'rehype-urls'

/**
 * Checks for any broken links via a HEAD request in production. A warning
 * message is posted if the request returns 405 NOT ALLOWED, and an error if a
 * URL returns 404.
 *
 * @param {import('url').URL} url - The `href` attribute of the anchor.
 * @param {Node} node - The anchor node.
 */
const checkLinks = (url, node) => {
  const { href } = url

  if (href === '#') {
    node.properties.href = ''
    return
  }

  if (
    process.env['ENVIRONMENT'] === 'production' ||
    process.env['VERCEL_ENV'] === 'production'
  ) {
    if (
      node.tagName === 'a' &&
      !href.startsWith('#') &&
      !href.startsWith('/')
    ) {
      fetch(href, { method: 'HEAD' }).then(({ status }) => {
        if (status === 404) {
          console.error(`link (${href}) returned 404`)
        }
        if (status === 405) {
          console.warn(`link (${href}) returned 405 - NOT ALLOWED`)
        }
      })
    }
  }
}

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
  extensions: ['.svelte.md'],
  smartypants: {
    quotes: true,
    ellipses: true,
    backticks: false,
    dashes: 'oldschool'
  },
  layout: {
    posts: './src/routes/posts/_layout.svelte'
  },
  remarkPlugins: [],
  rehypePlugins: [[urls, checkLinks]]
}

export default config
