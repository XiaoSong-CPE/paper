<script setup lang="ts">
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTOC from 'markdown-it-table-of-contents'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItContainer from 'markdown-it-container'
import * as echarts from 'echarts'
import draftString from '@/draft.md?raw'
// import draftString from '@/draft_zh_sample.md?raw'
import { nextTick, onMounted } from 'vue'
import css from '@/assets/pubcss-ieee.css?raw'
// import '@/assets/pubcss-acm-sig.css'
// import '@/assets/pubcss-acm-sigchi-ea.css'
// import '@/assets/pubcss-acm-sigchi.css'
import wordsCount from 'words-count'

let a = draftString
  // remove code block
  .replace(/```[\s\S]*?```/g, '')
  // remove <table> tag
  .replace(/<table[\s\S]*?<\/table>/g, '')
  // remove html tag
  .replace(/<[^>]*>/g, '')
  // remove markdown table
  .replace(/\|[\s\S]*?\n/g, '')
console.log(wordsCount(a))

let md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(markdownItAnchor)
  .use(markdownItTOC, {
    includeLevel: [1, 2, 3, 4]
  })
  .use(markdownItFootnote)
  .use(markdownItContainer, 'todo', {
    validate: (params: any) => params.trim().match(/^todo$/),
    render: (tokens: any, idx: any) => {
      if (tokens[idx].nesting === 1) {
        return `<div class="to-do"><div class="to-do-title">TO DO</div>\n`
      } else {
        return '</div>'
      }
    }
  })
  .use(markdownItContainer, 'echarts', {
    validate: (params: any) => params.trim().match(/^echarts\s+(.*)$/),
    render: (tokens: any, idx: any) => {
      if (tokens[idx].nesting === 1) {
        const m = tokens[idx].info.trim().match(/^echarts\s+(.*)$/)
        return `<figure class="echarts">\n<div style="width: 100%; height: auto; "></div>\n<figcaption>${m[1]}</figcaption>`
      } else {
        return '</figure>'
      }
    }
  })

/*
 * change footnote html
 * original html can be found at https://github.com/markdown-it/markdown-it-footnote/blob/master/index.mjs
 */
md.renderer.rules.footnote_block_open = () => '<div class="references">\n'
md.renderer.rules.footnote_block_close = () => '</div>\n'
md.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
  // @ts-ignore
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

  if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`

  return `<cite id="fn${id}">`
}
md.renderer.rules.footnote_close = () => '</cite>'
md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
  // @ts-ignore
  const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
  let refid = id

  if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`

  return `<a href="#fn${id}" id="fnref${refid}" class="footnote-ref">${id}</a>`
}

let draft = md.render(draftString)
// console.log(draft)

onMounted(async () => {
  // remove p tag in cite
  document.querySelectorAll('.references cite>p').forEach((cite) => {
    cite.outerHTML = cite.innerHTML
  })
  // move references to #ref
  const references = document.querySelector('.references')
  if (references) {
    const ref = document.querySelector('#ref')
    if (ref) {
      ref.appendChild(references)
    }
  }
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
</script>

<template>
  <div v-html="`<style>${css}</style>${draft}`"></div>
</template>

<style>
.echarts {
  margin-left: auto;
  margin-right: auto;
  max-width: 720px;
}
body {
  background-color: white;
}
figure pre {
  display: none;
}
.to-do {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
.to-do-title {
  font-weight: bold;
  margin-bottom: 1rem;
}
ul li {
  list-style: disc;
}
/* for print */
@media print {
  .page-break {
    page-break-after: always;
  }
  .to-do {
    display: none;
  }
}
</style>
