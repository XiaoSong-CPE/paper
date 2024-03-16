<script setup lang="ts">
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTOC from 'markdown-it-table-of-contents'
import markdownItFootnote from 'markdown-it-footnote'
import draftString from '@/draft.md?raw'

let md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(markdownItAnchor)
  .use(markdownItTOC, {
    includeLevel: [2, 3, 4]
  })
  .use(markdownItFootnote)
md.renderer.rules.footnote_block_open = () =>
  // '<h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a>6. References</h2>\n' +
  '<section class="footnotes">\n' + '<ol class="footnotes-list">\n'
let draft = md.render(draftString)
</script>

<template>
  <div v-html="draft" class="mdui-prose"></div>
</template>

<style></style>
