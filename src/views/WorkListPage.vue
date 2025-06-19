<template>
  <v-container>
    <h1 class="mb-4">作品列表页</h1>

    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-alert v-if="error" type="error" prominent>
      数据加载失败: {{ error }}
    </v-alert>

    <v-list lines="two" v-if="!loading && !error">
      <v-list-item
          v-for="work in works"
          :key="work.id"
          :title="work.title.primary"
          :subtitle="work.title.chinese"
          :to="`/work/${work.id}`"
          :prepend-avatar="work.images.poster"
      ></v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Work } from '@/types/models';
import { getWorks } from '@/api';

const works = ref<Work[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 组件挂载后执行数据获取
onMounted(async () => {
  try {
    works.value = await getWorks();
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = '发生未知错误';
    }
  } finally {
    loading.value = false;
  }
});
</script>