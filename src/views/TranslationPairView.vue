<script setup lang="ts">
import { NDataTable, NPopover, type DataTableColumns } from 'naive-ui'
import csv from '@/translation-pair.csv?raw'
import MarkdownIt from 'markdown-it'
import markdownItKatex from '@iktakahiro/markdown-it-katex'
import { h } from 'vue'
import { parse } from 'csv-parse/browser/esm/sync'
import 'github-markdown-css/github-markdown.css'
import 'mdui/mdui.css'

let md = new MarkdownIt({
  breaks: true
}).use(markdownItKatex)

type RawData = {
  Chinese: string
  English: string
  Note: string
}
type RowData = {
  Chinese: string
  English: string
  Note: string
  key: number
}

// Convert csv to json (remove BOM)
let rawData: RawData[] = parse(csv, {
  bom: true,
  delimiter: ';',
  columns: true,
  skip_empty_lines: true
})
let res = ''
for (let index = 0; index < rawData.length; index++) {
  const element = rawData[index]
  res = res + element.English + '\n'
}
console.log(res)
let rowData: RowData[] = rawData.map((row, index) => {
  return {
    ...row,
    key: index
  }
})

// reverse csv order for dev purpose
if (import.meta.env.DEV) {
  rowData.reverse()
}

let columns: DataTableColumns<RowData> = [
  {
    key: 'No.',
    title: 'No.',
    width: 48,
    render: (rowData, rowIndex) => {
      return rowData.Note
        ? h(
            NPopover,
            {
              trigger: 'hover'
            },
            {
              trigger: () => h('span', { style: { color: 'red' } }, rowIndex + 1),
              default: () => h('div', { innerHTML: md.render(rowData.Note) })
            }
          )
        : rowIndex + 1
    }
  },
  {
    key: 'Chinese',
    title: 'Chinese',
    className: 'mdui-prose',
    sorter: 'default',
    render: (rowData) => {
      return h('div', { innerHTML: md.render(rowData.Chinese) })
    }
  },
  {
    key: 'English',
    title: 'English',
    className: 'mdui-prose',
    sorter: 'default',
    render: (rowData) => {
      return h('div', { innerHTML: md.render(rowData.English) })
    }
  }
]
</script>

<template>
  <n-data-table
    :data="rowData"
    :columns="columns"
    :single-line="false"
    max-height="calc(100vh - 1rem - 20px - 75px - 42px)"
    size="small"
  />
</template>

<style>
.katex-html {
  display: none;
}
/* bordered table */
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid black;
  text-align: left;
  padding: 8px;
}
</style>
