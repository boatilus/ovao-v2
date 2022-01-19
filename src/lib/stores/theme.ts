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
  link: string
  highlight: string
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
  let scales = {}

  Object.keys(from).forEach((prop) => {
    if (from[prop] && to[prop]) {
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
      link: from.link ? scales['link'](t).css(CSS_REPRESENTATION) : to.link,
      highlight: from.highlight ? scales['highlight'](t).css(CSS_REPRESENTATION) : to.highlight
    }
  }
}

/** The theme store. */
export const theme = tweened<Theme>(
  {
    background: null,
    text: null,
    link: null,
    highlight: null
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
  return (theme) => {
    const root = document.documentElement

    Object.keys(theme).forEach((prop) => {
      if (theme[prop] && theme[prop] !== previous_theme[prop]) {
        root.style.setProperty(`--color-${prop}`, theme[prop], 'important')
        previous_theme[prop] = theme[prop]
      }
    })
  }
}
