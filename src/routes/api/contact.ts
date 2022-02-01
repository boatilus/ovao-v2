import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ params }) => {
  return {
    body: 'ok'
  }
}
