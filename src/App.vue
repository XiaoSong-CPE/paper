<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NCard, NIcon, NButton } from 'naive-ui'
import { HomeOutlined } from '@vicons/material'
</script>

<template>
  <n-config-provider :locale="zhCN" :dateLocale="dateZhCN" class="p-2">
    <n-card>
      <template #header>
        {{ $route.meta.title }}
      </template>
      <template #header-extra>
        <router-link to="/">
          <n-button tertiary circle>
            <template #icon>
              <n-icon size="1.5em">
                <HomeOutlined />
              </n-icon>
            </template>
          </n-button>
        </router-link>
      </template>
      <router-view />
    </n-card>
  </n-config-provider>
</template>

<style scoped></style>
