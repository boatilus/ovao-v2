import { access, readFile, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const THUMBNAIL_SIZE = 40
const BASE_HEIGHT = 385

const opts = [
  { format: 'png', height: THUMBNAIL_SIZE, suffix: '-thumbnail' },
  { format: 'jpg', height: BASE_HEIGHT, suffix: '', quality: 90 },
  { format: 'jpg', height: BASE_HEIGHT * 2, suffix: '@2x', quality: 85 },
  { format: 'jpg', height: BASE_HEIGHT * 3, suffix: '@3x', quality: 80 },
  { format: 'webp', height: BASE_HEIGHT, suffix: '', quality: 90 },
  { format: 'webp', height: BASE_HEIGHT * 2, suffix: '@2x', quality: 85 },
  { format: 'webp', height: BASE_HEIGHT * 3, suffix: '@3x', quality: 80 }
]

const args = process.argv

if (args.length < 3) {
  console.error('no filename specified')
  process.exit(1)
}

const filename = args[2]
const ext = path.extname(filename)
const basename = path.basename(filename, ext)
const outdir = path.join(process.cwd(), 'static', 'images', 'works')

try {
  const file = await readFile(filename)
  const image = sharp(file)

  const { width, height } = await image.metadata()

  console.log(`${basename} image dimensions: ${width}x${height}`)

  for (const opt of opts) {
    const out_filename = `${basename}${opt?.suffix || ''}.${opt.format}`
    const outpath = path.join(outdir, out_filename)

    // Check if the outfile exists. If so, skip it.
    try {
      await access(outpath)
      console.log(`skipping ${out_filename}: already exists`)
    } catch (err) {
      if (err?.code !== 'ENOENT') {
        console.error(err)
        process.exit(1)
      }

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

      await writeFile(outpath, buf)

      console.log(
        `wrote ${out_filename}: size ${+(buf.length / 1024).toFixed(2)}kb`
      )
    }
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
