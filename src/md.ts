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

  return `<a href="#fn${id}" id="fnref${refid}" class="footnote-ref">[${id}]</a>`
}

export default md
