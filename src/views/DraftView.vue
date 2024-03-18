<script setup lang="ts">
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTOC from 'markdown-it-table-of-contents'
import markdownItFootnote from 'markdown-it-footnote'
import draftString from '@/draft.md?raw'
import { onMounted } from 'vue'
import '@/assets/pubcss-ieee.css'
// import '@/assets/pubcss-acm-sig.css'
// import '@/assets/pubcss-acm-sigchi-ea.css'
// import '@/assets/pubcss-acm-sigchi.css'

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

let draft = md.render(draftString)
console.log(draft)

onMounted(() => {
  // remove p tag in cite
  document.querySelectorAll('.references cite>p').forEach((cite) => {
    cite.outerHTML = cite.innerHTML
  })
})
</script>

<template>
  <div v-html="draft"></div>
</template>

<style>
body {
  background-color: white;
}
</style>
