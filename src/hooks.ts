import type { Handle } from '@sveltejs/kit'
import { minify } from 'html-minifier' //Imports the module

// TODO: modify these?
const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
  removeEmptyElements: true
}

export const handle: Handle = async ({ request, resolve }) => {
  const response = await resolve(request)

  if (response.headers['content-type'] === 'text/html') {
    response.body = minify(response.body.toString(), minification_options)
  }

  return response
}
