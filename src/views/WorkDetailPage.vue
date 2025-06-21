<template>
  <v-container>
    <!-- 加载状态 -->
    <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px">
      <v-progress-circular
          indeterminate
          color="primary"
          :size="70"
          :width="7"
      ></v-progress-circular>
    </div>

    <!-- 错误状态 -->
    <v-alert
        v-else-if="error"
        type="error"
        prominent
        class="ma-4"
    >
      <v-alert-title>加载失败</v-alert-title>
      <div>{{ error }}</div>
      <v-btn
          color="error"
          variant="text"
          @click="retryLoading"
          class="mt-2"
      >
        重试
      </v-btn>
    </v-alert>

    <!-- 作品不存在 -->
    <v-alert
        v-else-if="!work && !loading"
        type="warning"
        prominent
        class="ma-4"
    >
      <v-alert-title>作品不存在</v-alert-title>
      <div>未找到ID为 {{ workId }} 的作品</div>
      <v-btn
          color="warning"
          variant="text"
          to="/works"
          class="mt-2"
      >
        返回作品列表
      </v-btn>
    </v-alert>

    <!-- 正常显示内容 -->
    <div v-else-if="work">
      <h1>{{ work.title.primary }}</h1>
      <p class="text-subtitle-1">{{ work.title.chinese }}</p>

      <!-- 这里是占位内容，将在下一个任务中完善UI布局 -->
      <v-card class="mt-4">
        <v-card-text>
          <pre>{{ JSON.stringify(work, null, 2) }}</pre>
        </v-card-text>
      </v-card>

      <!-- 显示角色信息（临时） -->
      <v-card class="mt-4" v-if="characters.length > 0">
        <v-card-title>角色信息</v-card-title>
        <v-card-text>
          <pre>{{ JSON.stringify(characters, null, 2) }}</pre>
        </v-card-text>
      </v-card>

      <!-- 显示关系信息（临时） -->
      <v-card class="mt-4" v-if="relationships.length > 0">
        <v-card-title>角色关系</v-card-title>
        <v-card-text>
          <pre>{{ JSON.stringify(relationships, null, 2) }}</pre>
        </v-card-text>
      </v-card>

      <!-- 显示关联作品（临时） -->
      <v-card class="mt-4" v-if="relatedWorks.length > 0">
        <v-card-title>关联作品</v-card-title>
        <v-card-text>
          <pre>{{ JSON.stringify(relatedWorks, null, 2) }}</pre>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Work, Character, Relationship } from '@/types/models';
import {
  getWorkById,
  getCharactersByIds,
  getRelationshipsByCharacterIds,
  getWorksByIds
} from '@/api';

// 路由相关
const route = useRoute();

// 响应式数据
const work = ref<Work | null>(null);
const characters = ref<Character[]>([]);
const relationships = ref<Relationship[]>([]);
const relatedWorks = ref<Work[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 计算属性
const workId = computed(() => {
  const id = route.params.id;
  return typeof id === 'string' ? id : id[0];
});

// 获取作品详情的主函数
async function fetchWorkDetails() {
  // 重置状态
  loading.value = true;
  error.value = null;
  work.value = null;
  characters.value = [];
  relationships.value = [];
  relatedWorks.value = [];

  try {
    // 1. 获取作品基本信息
    const workData = await getWorkById(workId.value);
    work.value = workData;

    // 2. 获取作品中的角色信息
    if (workData.characters && workData.characters.length > 0) {
      const characterIds = workData.characters.map(c => c.characterId);
      characters.value = await getCharactersByIds(characterIds);

      // 3. 获取角色之间的关系
      if (characterIds.length > 0) {
        relationships.value = await getRelationshipsByCharacterIds(characterIds);
      }
    }

    // 4. 获取关联作品信息
    if (workData.relations && workData.relations.length > 0) {
      const relatedWorkIds = workData.relations.map(r => r.workId);
      relatedWorks.value = await getWorksByIds(relatedWorkIds);
    }

  } catch (err) {
    console.error('Error fetching work details:', err);
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = '获取作品详情时发生未知错误';
    }
  } finally {
    loading.value = false;
  }
}

// 重试加载
function retryLoading() {
  fetchWorkDetails();
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchWorkDetails();
  }
});

// 组件挂载时加载数据
onMounted(() => {
  fetchWorkDetails();
});
</script>

<style scoped>
/* 预留样式位置，将在构建UI布局时使用 */
</style>