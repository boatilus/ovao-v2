/**
 * Adds SH1 hashes to all image files in static/images/works.
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import commandLineArgs from 'command-line-args'
import path from 'path'

const arg_option_defs = [{ name: 'dry', type: Boolean, defaultValue: false }]
const { dry } = commandLineArgs(arg_option_defs)

const { createHash } = await import('crypto')
const DIR = path.join(process.cwd(), 'static', 'images', 'works')
const VALID_EXTS = ['.jpg', '.webp', '.png']

const filename_regex = new RegExp(/(\w)*\+(\w@)*.(jpg|webp)/g)

const filenames = await readdir(DIR)

for (const filename of filenames) {
  // Check if desired outfile w/ hash already exists.
  if (filename_regex.test(filename)) {
    continue
  }

  const ext = path.extname(filename)
  if (!VALID_EXTS.includes(ext)) {
    console.log(`${filename} not JPEG or WebP; skipping..`)
    continue
  }

  const basename = path.basename(filename, ext)

  // For Retina images, we need to pull out the suffix.
  let [base, suffix] = basename.split('@', 2)
  if (!suffix) {
    suffix = ''
  } else {
    suffix = '@' + suffix
  }

  const hasher = createHash('sha1')

  try {
    const buf = await readFile(path.join(DIR, filename))
    const hash = hasher.update(buf).digest('hex')
    const out_filename = `${base}+${hash}${suffix}${ext}`

    if (dry) {
      console.log(out_filename)
      continue
    }

    await writeFile(path.join(DIR, out_filename), buf)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
