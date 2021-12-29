import { mdsvex } from 'mdsvex'
import mdsvex_config from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
//import reactiveCSSPreprocessor from 'svelte-reactive-css-preprocess'
import sequential from 'svelte-sequential-preprocessor'
import preprocess from 'svelte-preprocess'
import proc from './preprocess.js'

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
    target: 'body'
  }
}

export default config
