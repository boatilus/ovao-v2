import { once } from 'svelte/internal'
import type { FadeParams, FlyParams } from 'svelte/transition'
import { fade, fly } from 'svelte/transition'

/**
 * Run the fly animation only if the `condition` property is truthy.
 *
 * @param {Element} element - The element to animate.
 * @param {FlyParams & { condition: boolean }} - The `fly` parameters extended with a boolean `condition` property.
 */
export const flyIf = (
  element: Element,
  args: FlyParams & { condition: boolean }
) => {
  if (args.condition) {
    return fly(element, args)
  }
}

/**
 * Run the fly animation only if the element hasn't already been run once.
 *
 * @param {Element} - The element to animate.
 * @param {FlyParams & { id: string }} - The `fly` parameters.
 */
export const flyOnce = (element: Element, args: FlyParams) => {
  const id = Array.from(element.classList).find((el) => el.startsWith('s-'))

  if (id && !once_refs.includes(id)) {
    once_refs.push(id)
    return fly(element, args)
  }
}

/**
 * Run the fade animation only if the `condition` property is truthy.
 *
 * @param {Element} element - The element to animate.
 * @param {FadeParams & { condition: boolean }} - The `fade` parameters extended with a boolean `condition` property.
 */
export const fadeIf = (
  element: Element,
  args: FadeParams & { condition: boolean }
) => {
  if (args.condition) {
    return fade(element, args)
  }
}

// Maintains a list of elements who've been registered by *Once transition
// functions.
const once_refs: string[] = []
