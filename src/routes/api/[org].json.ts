import type { RequestHandler } from '@sveltejs/kit'
import path from 'path'

export const get: RequestHandler = async ({ params }) => {
  const { org } = params
  const url = path.join(process.env.RESUME_API_URL, org)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.RESUME_API_KEY + ':'
      ).toString('base64')}`
    }
  })
  if (!res.ok) {
    return {
      status: 500,
      body: res.statusText
    }
  }

  try {
    const { data } = await res.json()

    return {
      body: data
    }
  } catch (err) {
    return {
      status: 500,
      body: err
    }
  }
}
