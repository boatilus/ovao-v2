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
  if (!process.env.RESUME_PATHS) {
    console.warn('RESUME_PATHS unspecified; did you run with env-cmd?')
    return []
  }

  const paths = process.env.RESUME_PATHS.split(',')

  return paths.map((path) => `/resume/${path}`)
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
  },
  vite: {
    define: {
      'process.env': process.env
    }
  }
}

export default config
