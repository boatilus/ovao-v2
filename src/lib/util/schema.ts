import type { Person, Thing, WithContext } from 'schema-dts'
import { DOMAIN, LINKEDIN_URL, GITHUB_URL } from '$lib/variables'

export type Schema = Thing | WithContext<Thing>

export const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ron Jones',
  alternateName: 'Ronald Jones',
  nationality: 'American',
  gender: 'Male',
  email: 'ron@ovao.dev',
  jobTitle: 'Business Analyst',
  url: `https://${DOMAIN}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US'
  },
  sameAs: [LINKEDIN_URL, GITHUB_URL]
}

/**
 * Generates a script tag with the JSON-serialized data for a schema.org
 * Thing.
 */
export const serialize = (thing: Schema) =>
  `<script type="application/ld+json">${JSON.stringify(thing)}</script>`
