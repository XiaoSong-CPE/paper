<script setup lang="ts">
import { NCard, NFlex, NUl, NLi, NDivider } from 'naive-ui'
</script>

<template>
  <n-flex class="gap-2">
    <router-link to="/progress">
      <n-card class="w-fit" title="进度 Progress" hoverable> 论文的总工作进度。 </n-card>
    </router-link>
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
  <n-divider />
  <n-ul>
    <n-li>1. 如何判断英文是否“错误”？牛津词典和牛津英语语法？</n-li>
    <n-li>2. 如何对英语地区科技馆进行调查？随机抽样？</n-li>
    <n-li>3. 近期（专八考试前）论文进度安排？</n-li>
    <n-li>4. 论文格式？ACM SIG Proceedings？IEEE Conference Proceedings？</n-li>
  </n-ul>
</template>
