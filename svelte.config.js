import { readFileSync } from 'fs'
import { mdsvex } from 'mdsvex'
import mdsvex_config from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-vercel'
import sequential from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import escape from './escape.js'
import shiki from 'shiki'

const code_theme = JSON.parse(
  readFileSync('./src/rose-pine-color-theme.json', 'utf-8')
)

const highlighter = await shiki.getHighlighter({ theme: code_theme })

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
    escape({
      extensions: ['.svelte', '.svelte.md'],
      highlighter: highlighter.codeToHtml
    }),
    preprocess(),
    mdsvex(mdsvex_config)
  ]),
  kit: {
    adapter: adapter({
      edge: false,
      external: [],
      split: true
    }),
    prerender: {
      default: true,
      entries: ['*', '/404.html', ...getResumePaths()]
    }
  }
}

export default config
