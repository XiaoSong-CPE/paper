import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItContainer from 'markdown-it-container'

const md = markdownIt({
  html: true,
  typographer: true
})
  .use(markdownItAnchor)
  .use(markdownItFootnote)
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
  const index = tokens[idx].meta.id as number
  const refText = env.footnotes.list[index].content
  const name = refText.match(/^(.*?)[,|.|[]/)?.[1] || refText
  const year = refText.match(/\d{4}/)?.[0] || '!!!!'
  console.log(` (${name}, ${year})`);
  return ` (${name}, ${year})`
}
md.renderer.rules.render_footnote_anchor = () => ''

export default md
