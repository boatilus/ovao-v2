import type { RequestHandler } from '@sveltejs/kit'
import { titler } from '$lib/util'

import themes from '../themes.json'

export const get: RequestHandler = async () => {
  return {
    body: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${titler('Not Found')}</title>
        <style>
          body {
            background: ${themes['/'].background};
            color: ${themes['/'].text};
            font-family: 'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }

          h1 {
            cursor: default;
            font-size: 24vw;
            letter-spacing: -0.06em;
            margin: 0;
            overflow: hidden;
            opacity: 0.3;
            text-overflow: clip;
            text-rendering: geometricPrecision;
            white-space: nowrap;
            -webkit-text-stroke: 2px ${themes['/'].text};
            -webkit-text-fill-color: transparent;

            @media (min-width: 320px) and (max-width: $breakpoint) {
              margin-top: 0.5em;
            }
          }
        </style>
      </head>
      <body>
        <h1>Error 404</h1>
      </body>
    </html>`
  }
}