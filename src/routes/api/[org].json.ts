import type { RequestHandler } from '@sveltejs/kit'
import { readFile as _readFile } from 'fs'
import { promisify } from 'util'

const readFile = promisify(_readFile)

export const get: RequestHandler = async ({ params }) => {
  const { org } = params

  try {
    const file = await readFile(`./static/_orgs/${org}.json`, 'utf-8')

    return {
      body: file
    }
  } catch (error) {
    return {
      status: 404,
      body: `no org with name ${org}`
    }
  }
}
