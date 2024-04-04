<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NCard, NIcon, NButton } from 'naive-ui'
import { HomeOutlined } from '@vicons/material'
</script>
<!--  -->
<template>
  <router-view v-if="$route.name === 'draft'" />
  <n-config-provider :locale="zhCN" :dateLocale="dateZhCN" class="p-2" v-else>
    <n-card class="h-[calc(100vh-1rem)]" content-class="h-[calc(100vh-1rem-74px)] overflow-auto">
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
      <template #default>
        <router-view />
      </template>
    </n-card>
  </n-config-provider>
</template>

<style scoped></style>
