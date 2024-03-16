<script setup lang="ts">
import { NDataTable, type DataTableColumn } from 'naive-ui'
import csv from '@/translation-pair.csv?raw'
import * as xlsx from 'xlsx'
import MarkdownIt from 'markdown-it'
import { h, type VNodeChild } from 'vue'

let md = new MarkdownIt()
type Data = {
  Chinese: string
  English: string
  Note: string
}

// Convert csv to json (remove BOM)
let data: Data[] = xlsx.utils.sheet_to_json(
  xlsx.read(csv.replace(/^\uFEFF/, ''), { type: 'binary' }).Sheets.Sheet1
)
console.log(data[1])
let columns: DataTableColumn[] = [
  {
    key: 'Chinese',
    title: 'Chinese',
    className: 'mdui-prose',
    render: (row: Data): VNodeChild => {
      return h('div', { innerHTML: md.render(row.Chinese || '') })
    }
  },
  {
    key: 'English',
    title: 'English',
    className: 'mdui-prose',
    render: (row: Data): VNodeChild => {
      return h('div', { innerHTML: md.render(row.English || '') })
    }
  },
  {
    key: 'Note',
    title: 'Note',
    className: 'mdui-prose',
    render: (row: Data): VNodeChild => {
      return h('div', { innerHTML: md.render(row.Note || '') })
    }
  }
]
</script>

<template>
  <n-data-table :data="data" :columns="columns" virtual-scroll max-height="calc(100vh - 1rem - 20px - 75px - 42px)" size="small" />
</template>
