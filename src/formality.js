import fs from 'fs'
import { parse } from 'csv-parse/browser/esm/sync'

const dataRaw = await fs.readFileSync('/workspaces/paper/src/translation-pair.csv', 'utf8')
const data = parse(dataRaw, {
  bom: true,
  delimiter: ';',
  columns: true,
  skip_empty_lines: true
})
async function query(data) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/s-nlp/roberta-base-formality-ranker',
    {
      headers: { Authorization: 'Bearer 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' },
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
  const result = await response.json()
  return result
}

let results = []
for (const item of data) {
  const formality = await query(item['English'])
  results.push({ ...item, formality })
  console.log(JSON.stringify({ ...item, formality }, null, 2))
  // wait for 1000ms
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
// save results to a file
fs.writeFileSync('/workspaces/paper/src/formality.json', JSON.stringify(results, null, 2))
