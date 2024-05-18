<script setup lang="ts">
import md from '@/md'
import * as echarts from 'echarts'
import a_body from '@/content/a_body.md?raw'
import b_annex from '@/content/b_annex.md?raw'
import { nextTick, onMounted, ref } from 'vue'
import wordsCount from 'words-count'

let a_body_ele = ref<HTMLElement | null>(null)
let b_annex_ele = ref<HTMLElement | null>(null)

// rerender <img> to <figure>
function rerenderImg(ele: HTMLElement) {
  /* 
    change 
    <p><img alt="..."/></p>
    to
    <figure><img alt="..."/><figcaption>...</figcaption></figure>
    */
  let imgs = Array.from(ele.querySelectorAll('p:has(> img)'))
  imgs.forEach((img) => {
    const figure = document.createElement('figure')
    const imgEle = img.querySelector('img') as HTMLImageElement
    const imgClone = imgEle.cloneNode(true)
    const figcaption = document.createElement('figcaption')
    figcaption.textContent = imgEle.getAttribute('alt') || ''
    figure.appendChild(imgClone)
    figure.appendChild(figcaption)
    img.replaceWith(figure)
  })
}
// add prefix to headings
function autoHeadingsPrefix(ele: HTMLElement) {
  // list all headings in order
  let headings = Array.from(ele.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  // add prefix to each heading
  let h1Counter = 0
  let h2Counter = 0
  let h3Counter = 0
  let h4Counter = 0
  let h5Counter = 0
  let h6Counter = 0
  for (let index = 0; index < headings.length; index++) {
    const element = headings[index]
    // h1
    if (element.tagName === 'H1') {
      h1Counter++
      h2Counter = 0
      h3Counter = 0
      h4Counter = 0
      h5Counter = 0
      h6Counter = 0
    }
    // h2
    if (element.tagName === 'H2') {
      h2Counter++
      h3Counter = 0
      h4Counter = 0
      h5Counter = 0
      h6Counter = 0
      element.textContent = `${h1Counter}.${h2Counter} ${element.textContent}`
    }
    // h3
    if (element.tagName === 'H3') {
      h3Counter++
      h4Counter = 0
      h5Counter = 0
      h6Counter = 0
      element.textContent = `${h1Counter}.${h2Counter}.${h3Counter} ${element.textContent}`
    }
    // h4
    if (element.tagName === 'H4') {
      h4Counter++
      h5Counter = 0
      h6Counter = 0
      element.textContent = `${h1Counter}.${h2Counter}.${h3Counter}.${h4Counter} ${element.textContent}`
    }
    // h5
    if (element.tagName === 'H5') {
      h5Counter++
      h6Counter = 0
      element.textContent = `${h1Counter}.${h2Counter}.${h3Counter}.${h4Counter}.${h5Counter} ${element.textContent}`
    }
    // h6
    if (element.tagName === 'H6') {
      h6Counter++
      element.textContent = `${h1Counter}.${h2Counter}.${h3Counter}.${h4Counter}.${h5Counter}.${h6Counter} ${element.textContent}`
    }
  }
}
// add prefix to figcaptions
function autoFigcaptionPrefix(ele: HTMLElement) {
  // list all figcaptions in order
  let figcaptions = Array.from(ele.querySelectorAll('figcaption'))
  // add prefix to each figcaption
  let figCounter = 0
  for (let index = 0; index < figcaptions.length; index++) {
    const element = figcaptions[index]
    figCounter++
    element.textContent = `Figure ${figCounter}: ${element.textContent}`
  }
}
// add prefix to div.caption
function autoCaptionPrefix(ele: HTMLElement) {
  // list all div.caption in order
  let captions = Array.from(ele.querySelectorAll('div.caption'))
  // add prefix to each caption
  let captionCounter = 0
  for (let index = 0; index < captions.length; index++) {
    const element = captions[index]
    captionCounter++
    element.textContent = `Table ${captionCounter}: ${element.textContent}`
  }
}
// process ref
function processRef(ele: HTMLElement) {
  // remove p tag in cite
  ele.querySelectorAll('.references cite>p').forEach((cite) => {
    cite.outerHTML = cite.innerHTML
  })
}
// order references
function orderRef() {
  let refList = Array.from(document.querySelectorAll('.references cite'))
  refList.sort((a, b) => {
    return a.textContent!.localeCompare(b.textContent!)
  })
  let refEle = document.querySelector('.references')
  let num = 1
  refList.forEach((ref) => {
    ref.textContent = `[${num++}]${ref.textContent}`
    refEle?.appendChild(ref)
  })
}
onMounted(() => {
  if (!a_body_ele.value) return
  rerenderImg(a_body_ele.value)
  autoHeadingsPrefix(a_body_ele.value)
  autoFigcaptionPrefix(a_body_ele.value)
  autoCaptionPrefix(a_body_ele.value)
  processRef(a_body_ele.value)
  orderRef()
})

onMounted(async () => {
  // render echarts
  document.querySelectorAll('.echarts').forEach(async (echartsFigure) => {
    const json = echartsFigure.querySelector('pre')?.textContent
    if (!json) return
    const option = JSON.parse(json)
    const div = echartsFigure.querySelector('div')
    if (!div) return
    const chart = echarts.init(div, null, {
      renderer: 'svg',
      width: '720px',
      height: '480px'
    })
    chart.setOption(option)
    // resize svg after echarts is rendered
    await nextTick()
    div.querySelector('div')?.setAttribute('style', 'width: 100%; height: auto')
    const svg = div.querySelector('svg')
    if (!svg) return
    svg.setAttribute('width', '100%')
    svg.removeAttribute('height')
    svg.setAttribute('viewBox', `0 0  720 480`)
    svg.removeAttribute('style')
  })
})

// print control
function print() {
  window.print()
}
function scroll2Ref() {
  document.querySelector('#references')?.scrollIntoView()
}
const wordsCounted = wordsCount(
  a_body
    .replace(/```[\s\S]*?```/g, '') // remove code block
    .replace(/<[^>]*>/g, '') // remove html tag
)
let displayRef = ref(true)
let displayAnnex = ref(false)
</script>

<template>
  <div class="print:hidden p-4 font-sans">
    <n-flex>
      <n-button type="primary" @click="print()"> 打印 </n-button>
      <n-button @click="scroll2Ref()"> 查看参考文献 </n-button>
      <n-tag type="info"> 词数统计：约{{ wordsCounted }}词 </n-tag>
      <n-checkbox v-model:checked="displayRef"> 显示参考文献 </n-checkbox>
      <n-checkbox v-model:checked="displayAnnex"> 显示附录 </n-checkbox>
    </n-flex>
  </div>
  <div
    ref="a_body_ele"
    :class="displayRef ? '' : 'hide-ref'"
    v-html="md.render(a_body)"
  ></div>
  <div ref="b_annex_ele" v-html="md.render(b_annex)" v-show="displayAnnex"></div>
</template>

<style lang="less">
body {
  font-family: 'Times New Roman', '宋体';
  background-color: white;
}
h1 {
  font-size: 16pt;
  font-weight: bold;
  margin-top: 24pt;
  margin-bottom: 18pt;
  line-height: 1;
}
h2 {
  font-size: 15pt;
  font-weight: bold;
  margin-top: 24pt;
  margin-bottom: 18pt;
  line-height: 1;
}
h3 {
  font-size: 14pt;
  font-weight: bold;
  margin-top: 24pt;
  margin-bottom: 18pt;
  line-height: 1;
}
h4 {
  font-size: 13pt;
  font-weight: bold;
  margin-top: 24pt;
  margin-bottom: 18pt;
  line-height: 1;
}
p {
  text-indent: 1em;
  font-size: 12pt;
  line-height: 20pt;
  text-align: justify;
}
figure {
  margin: 1em auto;
  max-width: 480px;
  pre {
    display: none;
  }
  figcaption {
    text-align: center;
    font-size: 10.5pt;
  }
}
// div.caption directly before table
div.caption {
  text-align: center;
  font-size: 10.5pt;
  margin-top: 1em;
  margin-bottom: -1em;
}
table {
  margin: 1em auto;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  thead {
    border-bottom: 1px solid black;
  }
  th,
  td {
    padding: 0.5em 1em;
  }
  p {
    text-indent: 0;
  }
}
.hide-ref {
  a.footnote-ref,
  h1#references,
  .references {
    display: none;
  }
}
.references {
  counter-reset: cite-counter; /* Initialize the counter */
  cite {
    display: block;
    font-style: normal;
  }
}
ul {
  margin: 1em 0 1em 2em;
  text-align: justify;
  list-style-type: disc;
  p {
    text-indent: 0;
  }
}
ol {
  margin: 1em 0 1em 2em;
  text-align: justify;
  list-style-type: decimal;
  p {
    text-indent: 0;
  }
}
a {
  color: #3b82f6;
}
code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: #afb8c133;
  border-radius: 6px;
  color: #1f2328;
}
.footnote-backref {
  display: none;
}
/* for print */
@media print {
  h1 {
    page-break-before: always;
  }
  h2,
  h3,
  h4 {
    page-break-after: avoid;
  }
  figure {
    page-break-inside: avoid;
  }
  .to-do {
    display: none;
  }
  // display <a> link
  a:not([href^='#fn'])::after {
    content: ' (' attr(href) ')';
  }
}
// basic print paper setting
@page {
  width: 16cm;
  height: 24.2cm;
  margin: 0;
}
</style>
