import type { InterpolationMode } from 'chroma-js'
import type { Subscriber } from 'svelte/store'
import chroma from 'chroma-js'
import { tweened } from 'svelte/motion'
import { expoOut } from 'svelte/easing'

const DURATION = 1800 // the number of milliseconds to transition over
const SCALE_MODE: InterpolationMode = 'lrgb'
const CSS_REPRESENTATION = 'hsl'

export interface Theme {
  background: string
  text: string
  links: string
}

/**
 * Interpolates between properties between two themes in linear RGB space. If
 * the values provided in `from` are nullish, it 'interpolates' between the
 * `to` values.
 *
 * @param {Theme} from - The start value.
 * @param {Theme} to - The end value.
 */
const lerpLinear = (from: Theme, to: Theme) => {
  let scales = new Object()

  Object.keys(from).forEach((prop) => {
    if (prop) {
      scales[prop] = chroma
        .scale([from[prop] || to[prop], to[prop]])
        .mode(SCALE_MODE)
    }
  })

  return (t: number) => {
    return {
      background: from.background
        ? scales['background'](t).css(CSS_REPRESENTATION)
        : to.background,
      text: from.text ? scales['text'](t).css(CSS_REPRESENTATION) : to.text,
      links: from.links ? scales['links'](t).css(CSS_REPRESENTATION) : to.links
    }
  }
}

/** The theme store. */
export const theme = tweened<Theme>(
  {
    background: null,
    text: null,
    links: null
  },
  {
    duration: DURATION,
    easing: expoOut,
    interpolate: lerpLinear
  }
)

/**
 * Creates a subscriber for the store. The subscriber is responsible for
 * updating the CSS variables upon changes to the theme.
 *
 * @param {Document} document - The HTML document.
 * @param {Theme} previous_theme - The theme from which it will transition.
 */
export const createSubscriber = (
  document: Document,
  previous_theme: Theme
): Subscriber<Theme> => {
  return ({ background, text, links }) => {
    const root = document.documentElement

    if (background && background !== previous_theme.background) {
      root.style.setProperty('--color-background', background, 'important')
      previous_theme.background = background
    }
    if (text && text !== previous_theme.text) {
      root.style.setProperty('--color-text', text, 'important')
      previous_theme.text = text
    }
    if (links && links !== previous_theme.links) {
      root.style.setProperty('--color-link', links, 'important')
      previous_theme.links = links
    }
  }
}
