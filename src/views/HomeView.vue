<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// 我们同样需要获取作品列表数据来展示
const works = ref<any[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/db/works.json')
    works.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch works list:', error)
  }
})
</script>

<template>
  <v-container>
    <v-sheet
      color="grey-lighten-4"
      class="pa-12 text-center rounded-lg"
      min-height="300px"
      style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <h1 class="text-h3 font-weight-bold">探索百合的世界</h1>
      <p class="text-medium-emphasis mt-2 mb-8">一个专注、全面的百合作品线上数据库</p>
      <div style="width: 100%; max-width: 600px;">
        <v-text-field
          label="搜索作品..."
          variant="solo"
          prepend-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </v-sheet>

    <div class="text-center my-10">
      <h2 class="text-h5 mb-4">按类型浏览</h2>
      <RouterLink to="/works" class="text-decoration-none">
        <v-btn class="ma-2" color="blue-grey-lighten-5">全部作品</v-btn>
      </RouterLink>
      <v-btn class="ma-2">动画</v-btn>
      <v-btn class="ma-2">漫画</v-btn>
      <v-btn class="ma-2">游戏</v-btn>
      <v-btn class="ma-2">小说</v-btn>
    </div>

    <v-divider class="my-6"></v-divider>

    <div>
      <h2 class="text-h5 mb-4">近期收录</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="work in works" :key="work.id">
          <RouterLink :to="`/works/${work.id}`" class="text-decoration-none">
            <v-card class="ma-3" width="180" hover>
              <v-img :src="work.images.poster" :aspect-ratio="2/3" cover></v-img>
              <div class="pa-2">
                <div class="font-weight-bold text-truncate">{{ work.title.chinese || work.title.primary }}</div>
                <div class="text-caption text-grey">{{ work.type.main }}</div>
              </div>
            </v-card>
          </RouterLink>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <div class="mt-10">
      <h2 class="text-h5 mb-4">编辑推荐</h2>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="work in works.slice().reverse()" :key="work.id">
          <RouterLink :to="`/works/${work.id}`" class="text-decoration-none">
            <v-card class="ma-3" width="180" hover>
              <v-img :src="work.images.poster" :aspect-ratio="2/3" cover></v-img>
              <div class="pa-2">
                <div class="font-weight-bold text-truncate">{{ work.title.chinese || work.title.primary }}</div>
                <div class="text-caption text-grey">{{ work.type.main }}</div>
              </div>
            </v-card>
          </RouterLink>
        </v-slide-group-item>
      </v-slide-group>
    </div>

  </v-container>
</template>