import type { Theme } from '$lib/util/theme'
import type { Handle } from '@sveltejs/kit'
import * as cheerio from 'cheerio'
import UrlPattern from 'url-pattern'
import { minify } from 'html-minifier'
import { prerendering } from '$app/env'

import themes from './themes.json'

type PatternsMap = {
  [key: string]: UrlPattern
}

let patterns: PatternsMap = {}

for (const prop in themes) {
  patterns[prop] = new UrlPattern(prop)
}

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

  if (
    !prerendering ||
    !response.headers ||
    response.headers['content-type'] !== 'text/html'
  ) {
    // We only care about doing this during prerendering pages.
    return response
  }

  let theme: Theme

  for (const prop in patterns) {
    if (patterns[prop].match(request.url.pathname)) {
      theme = themes[prop]
      break
    }
  }

  if (!theme) {
    // No theme available; simply return the response
    return response
  }

  const $ = cheerio.load(response.body.toString())

  $('head').append(`<style>
    :root {
      --background-color: ${theme.background};
      --text-color: ${theme.text};
    }
  </style>`)

  const body = $.html()

  console.log(`mininfying prerendered request at ${request.url.pathname}..`)

  return {
    ...response,
    body: minify(body, minification_options)
  }
}
