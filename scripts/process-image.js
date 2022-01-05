/**
 * Converts the input image to 1x, 2x and 3x WebP and JPEGs and outputs to
 * the folder specified by the `out` argument
 * (defaults to /static/imagess/works).
 *
 * The output filename is {basename}+{SHA-1 hash}{?Nx}.{extension}.
 */
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import commandLineArgs from 'command-line-args'
import sharp from 'sharp'

const THUMBNAIL_SIZE = 40
const BASE_HEIGHT = 385

const { createHash } = await import('crypto')

const arg_option_defs = [
  { name: 'src', type: String, defaultOption: true },
  { name: 'dry', type: Boolean, defaultValue: false },
  {
    name: 'out',
    type: String,
    defaultValue: path.join(process.cwd(), 'static', 'images', 'works')
  }
]

const opts = [
  { format: 'png', height: THUMBNAIL_SIZE, suffix: '-thumbnail' },
  { format: 'jpg', height: BASE_HEIGHT, suffix: '', quality: 90 },
  { format: 'jpg', height: BASE_HEIGHT * 2, suffix: '@2x', quality: 85 },
  { format: 'jpg', height: BASE_HEIGHT * 3, suffix: '@3x', quality: 80 },
  { format: 'webp', height: BASE_HEIGHT, suffix: '', quality: 90 },
  { format: 'webp', height: BASE_HEIGHT * 2, suffix: '@2x', quality: 85 },
  { format: 'webp', height: BASE_HEIGHT * 3, suffix: '@3x', quality: 80 }
]

const { src, dry } = commandLineArgs(arg_option_defs)

if (!src || src.length === 0) {
  console.error('no input file specified')
  process.exit(1)
}

const filename = src
const ext = path.extname(filename)
const basename = path.basename(filename, ext)
const outdir = path.join(process.cwd(), 'static', 'images', 'works')

try {
  const file = await readFile(filename)
  const image = sharp(file)

  const { width, height } = await image.metadata()

  console.log(`${basename} image dimensions: ${width}x${height}`)

  for (const opt of opts) {
    const hasher = createHash('sha1')
    const img = image.clone()

    if (height < opt.height) {
      console.log(
        `skipping ${out_filename}: target of ${opt.height}px less than original`
      )
      continue
    }

    if (opt?.blur) {
      img.blur(opt.blur)
    }

    const buf = await img
      .resize({ height: opt.height })
      .toFormat(opt.format, { quality: opt.quality || 100 })
      .toBuffer()

    const hash = hasher.update(buf).digest('hex')
    const out_filename = `${basename}+${hash}${opt?.suffix || ''}.${opt.format}`
    const outpath = path.join(outdir, out_filename)
    const size_string = `${+(buf.length / 1024).toFixed(2)}kb`

    if (!dry) {
      await writeFile(outpath, buf)

      console.log(`wrote ${out_filename}: size ${size_string}`)
    } else {
      console.log(
        `dry-processed ${out_filename} successfully: size ${size_string}`
      )
    }
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
