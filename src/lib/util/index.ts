import { TITLE } from '$lib/variables'

export const titler = (str: string, title: string = TITLE) => {
  if (title === '') {
    return str
  }

  return `${str} - ${title}`
}

/** Returns a random integer between `min` and `max`, inclusive. */
export const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

/**
 * Performs an in-place shuffle of an array using the Fisher–Yates/Durstenfeld
 * shuffle algorithm.
 */
export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
