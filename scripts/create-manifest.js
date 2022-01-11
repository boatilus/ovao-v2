/**
 * Creates a works-manifest.json file in src/ with details on all images
 * in the /static/images/works directory.
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const outdir = path.join(process.cwd(), 'static', 'images', 'works')
const outname = 'works-manifest.json'
const catalog_file_path = path.join(process.cwd(), 'src', outname)

let obj = {}
let catalog = []

const filename_regex = new RegExp(/(\+){1}(\S)*(webp|jpg)/)

const { createHash } = await import('crypto')

try {
  const filenames = await readdir(outdir)

  for (const filename of filenames) {
    const ext = path.extname(filename)
    const ext_less_dot = ext.substring(1)
    const base = path.basename(filename, ext)

    // If the filename doesn't have the hash marker present, skip it.
    if (!filename_regex.test(filename)) {
      continue
    }

    const [basename] = path.basename(filename, ext).split('+')
    let [_, suffix] = base.split('@')
    if (!suffix) {
      suffix = ''
    }

    const buffer = await readFile(path.join(outdir, filename))
    const img = sharp(buffer)

    const { width, height } = await img.metadata()
    const { dominant } = await img.stats()
    const hash = createHash('sha1').update(buffer).digest('hex')

    let ref = obj[basename]
    if (!ref) {
      obj[basename] = {
        name: basename,
        aspect_ratio: width / height,
        dominant_color: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`
      }
      ref = obj[basename]
    }

    // Base image height is always 385, so we'll add that to the object
    // under 'base'.
    if (height === 385) {
      if (!ref.base) {
        ref.base = { width, height }
      }

      ref.base[ext_less_dot] = { hash: hash }
    } else {
      // Otherwise it's some other resolution.
      if (!ref[`@${suffix}`]) {
        ref[`@${suffix}`] = { width, height }
      }

      ref[`@${suffix}`][ext_less_dot] = { hash: hash }
    }
  }

  for (const prop in obj) {
    catalog.push(obj[prop])
  }

  await writeFile(catalog_file_path, JSON.stringify(catalog, null, '  '))
  console.log(`wrote ${outname}`)
} catch (err) {
  console.log(err)
  process.exit(1)
}
