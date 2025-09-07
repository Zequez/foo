import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function cleanSvgAttributes(dir: string) {
  const files = await readdir(dir)

  for (const file of files) {
    if (!file.endsWith('.svg')) continue

    const path = join(dir, file)
    const content = await readFile(path, 'utf8')

    const m = file.match(/([^/]+)\.svg$/)
    if (!m) continue
    const id = m[1]

    // Remove id="Layer_1" and data-name="Layer 1" if present
    const cleaned = content.replace(/cls\-/g, `${id}-cls-`)

    if (content !== cleaned) {
      console.log(`Cleaning ${file}`)
      await writeFile(path, cleaned, 'utf8')
    }
  }
}

// Run with: ts-node clean-svg-attrs.ts <directory>
const dir = './separators'
if (!dir) {
  console.error('Usage: ts-node clean-svg-attrs.ts <directory>')
  process.exit(1)
}

cleanSvgAttributes(dir).catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
