import { readdirSync } from 'fs'
import path from 'path'
import { mdsvex } from 'mdsvex'
import mdsvex_config from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
import sequential from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import proc from './preprocess.js'

/**
 * Scans the ./static/_orgs directory for JSON files describing properties to
 * feed to the resume/[org] routes.
 */
const getResumePaths = () => {
  const filenames = readdirSync('./static/_orgs')

  return filenames
    .filter(
      (filename) => filename !== 'base.json' || !filename.includes('.json')
    )
    .map((filename) => {
      const { name } = path.parse(filename)
      return `/resume/${name}`
    })
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvex_config.extensions],
  preprocess: sequential([
    proc({ format: true }),
    preprocess(),
    mdsvex(mdsvex_config)
  ]),
  kit: {
    adapter: adapter({
      pages: '.output',
      assets: '.output',
      precompress: true // FIXME: not working?
    }),
    prerender: {
      entries: ['*', ...getResumePaths()]
    },
    target: 'body'
  }
}

export default config
