/**
 * Creates a works-manifest.json file in src/ with details on all images
 * in the /static/images/works directory.
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const outdir = path.join(process.cwd(), 'static', 'images', 'works')
const catalog_file_path = path.join(process.cwd(), 'src', 'works-manifest.json')

let obj = {}
let catalog = []

try {
  const filenames = await readdir(outdir)

  for (const filename of filenames) {
    const ext = path.extname(filename)

    if (ext !== '.webp') {
      continue
    }

    const basename = path.basename(filename, ext)
    const less_suffixes = basename.split('@')

    const buffer = await readFile(path.join(outdir, filename))
    const img = sharp(buffer)

    const { width, height } = await img.metadata()
    const { dominant } = await img.stats()

    const ref = obj[less_suffixes[0]]
    if (!ref) {
      obj[less_suffixes[0]] = {
        name: less_suffixes[0],
        aspect_ratio: width / height,
        dominant_color: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`
      }
    }

    // Base image height is always 385, so we'll add that to the object
    // under 'base'.
    if (height === 385) {
      obj[less_suffixes[0]].base = { width, height }
    } else {
      // Otherwise it's some other resolution.
      obj[less_suffixes[0]][`@${less_suffixes[1]}`] = { width, height }
    }
  }

  for (const prop in obj) {
    catalog.push(obj[prop])
  }

  await writeFile(catalog_file_path, JSON.stringify(catalog, null, '  '))
  console.log('wrote catalog-array.json')
} catch (err) {
  console.log(err)
  process.exit(1)
}
