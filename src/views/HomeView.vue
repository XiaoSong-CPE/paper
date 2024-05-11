<script setup lang="ts">
import { NCard, NFlex } from 'naive-ui'
</script>

<template>
  <n-flex class="gap-2">
    <router-link to="/draft">
      <n-card class="w-fit" title="稿件 Draft" hoverable>
        目前论文已写的部分，包含所有定稿和草稿。未来完善为初稿和定稿。
      </n-card>
    </router-link>
    <router-link to="/translation-pair">
      <n-card class="w-fit" title="译表 Translation Pair" hoverable>
        中国科技馆内文本的中英文对照表。
      </n-card>
    </router-link>
  </n-flex>
</template>
