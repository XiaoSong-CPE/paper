<script setup lang="ts">
import { NDataTable, type DataTableColumns } from 'naive-ui'
import csv from '@/translation-pair.csv?raw'
import MarkdownIt from 'markdown-it'
import { h } from 'vue'
import { parse } from 'csv-parse/browser/esm/sync'

let md = new MarkdownIt()
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
let rowData: RowData[] = rawData.map((row, index) => {
  return {
    ...row,
    key: index
  }
})

let columns: DataTableColumns<RowData> = [
  {
    type: 'expand',
    expandable: (rowData) => rowData.Note !== '',
    renderExpand: (rowData) => {
      return h('div', { innerHTML: md.render(rowData.Note) })
    }
  },
  {
    key: 'Chinese',
    title: 'Chinese',
    className: 'mdui-prose',
    render: (rowData) => {
      return h('div', { innerHTML: md.render(rowData.Chinese) })
    }
  },
  {
    key: 'English',
    title: 'English',
    className: 'mdui-prose',
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
    virtual-scroll
    :single-line="false"
    max-height="calc(100vh - 1rem - 20px - 75px - 42px)"
    size="small"
  />
</template>
