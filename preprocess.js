import { cwd } from 'process'
import { XMLParser } from 'fast-xml-parser'
import dedent from 'dedent'
import MagicString from 'magic-string'
import prettier from 'prettier'
import shiki from 'shiki'

// Escape curlies, backticks, \t, \r and \n to avoid breaking output of
// {@html `here`} Svelte-like files.
const escapeSvelte = (str) =>
  str
    .replace(
      /[{}`]/g,
      //@ts-ignore
      (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c])
    )
    .replace(/\\([trn])/g, '&#92;$1')

const parser = new XMLParser({
  alwaysCreateTextNode: true,
  allowBooleanAttributes: true,
  attributesGroupName: 'attr',
  attributeNamePrefix: '',
  ignoreAttributes: false
})

const tag_regex = new RegExp(/<CodeBlock[\s\S]*?>([\s\S]*?)<\/CodeBlock>/g)

const default_opts = {
  format: false,
  extensions: ['.svelte', '.svelte.md']
}

const process = (opts) => {
  opts = { ...default_opts, ...opts }

  let prettier_opts = {}

  if (opts.format) {
    // Load Prettier options from the current working directory, working
    // downward.
    prettier_opts = prettier.resolveConfig.sync(cwd())
  }

  return {
    markup: async ({ content, filename }) => {
      const fullext = '.' + filename.split('.').slice(1).join('.')

      if (fullext !== '.svelte.md') {
        // For now we only care about MDSvex files.
        return {
          code: content
        }
      }

      let code = new MagicString(content)

      let match
      while ((match = tag_regex.exec(content)) != null) {
        const length = match[0].length
        const start_index = match.index
        const end_index = start_index + length

        const parsed = parser.parse(match[0])
        //console.log(parsed)

        let slot_contents = dedent(parsed.CodeBlock['#text'])
        //console.log(slot_contents)

        if (opts.format) {
          slot_contents = prettier.format(slot_contents, {
            parser: 'babel',
            ...prettier_opts
          })

          // TODO: load custom theme
          const highligher = await shiki.getHighlighter({ theme: 'nord' })

          // If the element has a `lang` attribute, use its value as the
          // language for shiki.
          if (parsed.CodeBlock?.attr?.lang) {
            slot_contents = highligher.codeToHtml(slot_contents, {
              lang: parsed.CodeBlock.attr.lang
            })
          }
        }

        // Re-insertion is simply the fully-escaped string.
        // TODO: re-insert originally-composed tag with attributes et al.
        const wrapped = `<CodeBlock>{@html \`${escapeSvelte(
          slot_contents
        )}\`}</CodeBlock>`

        code.overwrite(start_index, end_index, wrapped)
      }

      const map = code.generateMap({
        source: filename,
        file: filename + '.map',
        includeContent: true
      })

      return {
        code: code.toString(),
        map
      }
    }
  }
}

export default process
