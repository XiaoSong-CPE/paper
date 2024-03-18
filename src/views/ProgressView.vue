<template>
  <n-list>
    <n-list-item v-for="(item, index) in list" :key="index">
      <template #prefix>
        <n-checkbox
          :checked="item.progress !== 0 || item.date"
          :indeterminate="item.progress !== 1 && item.progress !== 0"
        />
      </template>
      <template #default>
        <n-text>
          {{ item.text }}
        </n-text>
      </template>
      <template #suffix>
        <n-tag style="margin-left: 4px" size="small" type="success">
          {{ item.date ? dayjs(item.date).format('ll') : item.progress * 100 + '%' }}
        </n-tag>
      </template>
    </n-list-item>
  </n-list>
  <n-divider>总进度 Total Progress</n-divider>
  <!-- total progress (sum list.progress / list.length) -->
  <n-progress
    :percentage="floor((list.reduce((acc, cur) => acc + cur.progress, 0) / list.length) * 100)"
    type="line"
    processing
  />
</template>

<script setup lang="ts">
import { NList, NListItem, NCheckbox, NTag, NText, NProgress, NDivider } from 'naive-ui'
import { floor } from 'lodash-es'
import dayjs from 'dayjs'
import dayjsDe from 'dayjs/locale/de'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)
dayjs.locale(dayjsDe)

let list = [
  {
    text: '确定选题',
    progress: 1,
    date: '2023-12-17'
  },
  {
    text: '撰写申请书和开题报告',
    progress: 1,
    date: '2024-1-14'
  },
  {
    text: '北京科技馆实地考察与图片记录',
    progress: 1,
    date: '2024-3-15'
  },
  {
    text: '图片整理和文字转写',
    progress: 0.02
  },
  {
    text: '初步翻译质量评估与Demo撰写',
    progress: 0.1
  },
  {
    text: '确定指导理论和QA模型',
    progress: 0
  },
  {
    text: '通过中期答辩',
    progress: 0
  },
  {
    text: '完成论文初稿',
    progress: 0
  },
  {
    text: '完成论文终稿',
    progress: 0
  }
]
</script>

<style scoped></style>
