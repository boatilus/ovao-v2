import { TITLE } from '$lib/variables'

export const titler = (str: string, title: string = TITLE) => {
  if (title === '') {
    return str
  }

  return `${str} - ${title}`
}
