import fs from 'fs'

const dataRaw = fs.readFileSync('D:\\文档\\GitHub\\paper\\src\\formality.json', 'utf8')
const data = JSON.parse(dataRaw)
// console.log(data[0].formality[0][0].score);
let arr = data.map((item) => {
  console.log(item)
  return item.formality[0][0].score
})
// let arr = data.map((item) => item.formality[0])
console.log(arr)
