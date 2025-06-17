<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定义三个独立的响应式变量，分别存储作品、角色详情、关联作品详情
const work = ref<any>(null)
const detailedCharacters = ref<any[]>([])
const relatedWorks = ref<any[]>([])

onMounted(async () => {
  try {
    // === 第1步：获取主要作品数据 ===
    const workResponse = await fetch('/db/works/1.json')
    if (!workResponse.ok) throw new Error('Work not found')
    work.value = await workResponse.json()

    // === 第2步：获取详细角色数据 ===
    // 只有在成功获取到作品数据后才执行
    if (work.value && work.value.characters) {
      const characterPromises = work.value.characters.map((char: any) =>
        fetch(`/db/characters/${char.characterId}.json`).then(res => res.json())
      )
      // Promise.all 会等待所有角色的fetch请求都完成后，再统一返回结果
      detailedCharacters.value = await Promise.all(characterPromises)
    }

    // === 第3步：获取关联作品数据 ===
    // (逻辑同上)
    if (work.value && work.value.relations) {
      const relationPromises = work.value.relations.map(async (rel: any) => {
        const relatedWorkResponse = await fetch(`/db/works/${rel.workId}.json`)
        const relatedWorkData = await relatedWorkResponse.json()
        // 将关系类型（如“改编自”）和作品数据合并
        return { ...relatedWorkData, relationType: rel.relationType }
      })
      relatedWorks.value = await Promise.all(relationPromises)
    }

  } catch (error) {
    console.error('Failed to fetch page data:', error)
  }
})
</script>

<template>
  <v-container v-if="work">
    <v-row>
      <v-col cols="12" md="3">
        <v-img :src="work.images.poster" :aspect-ratio="2/3" cover class="rounded-lg"></v-img>
      </v-col>
      <v-col cols="12" md="9">
        <h1 class="text-h3 font-weight-bold">{{ work.title.chinese || work.title.primary }}</h1>
        <p class="text-grey mt-1">{{ work.title.primary }}</p>
        <div class="mt-4 d-flex ga-2">
          <v-chip color="pink-lighten-4" prepend-icon="mdi-heart-multiple">{{ work.yuri_details.level }}</v-chip>
          <v-chip color="blue-lighten-4" prepend-icon="mdi-percent">{{ work.yuri_details.concentration }}%</v-chip>
        </div>
        <p class="mt-6 text-body-1">{{ work.synopsis }}</p>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row>
      <v-col cols="12" md="4">
        <v-card variant="tonal">
          <v-list>
            <v-list-item title="作品类型" :subtitle="`${work.type.main} / ${work.type.sub}`"></v-list-item>
            <v-list-item title="发行状况" :subtitle="work.status"></v-list-item>
            <v-list-item title="发行周期" :subtitle="`${work.period.start} ~ ${work.period.end}`"></v-list-item>
            <v-list-item v-if="work.counts.episodes" title="集数" :subtitle="`${work.counts.episodes} episodes`"></v-list-item>
            <v-list-subheader>制作人员</v-list-subheader>
            <v-list-item v-for="staff in work.staff" :key="staff.name" :title="staff.role" :subtitle="staff.name"></v-list-item>
            <v-list-subheader>标签</v-list-subheader>
            <div class="pa-4 pt-0">
              <v-chip v-for="tag in work.tags" :key="tag" class="mr-2 mb-2">{{ tag }}</v-chip>
            </div>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <h2 class="text-h5 mb-4">角色列表</h2>
        <v-row>
          <v-col v-for="char in detailedCharacters" :key="char.id" cols="12" md="6">
            <v-card variant="outlined">
              <div class="d-flex">
                <v-avatar class="ma-3" size="64" rounded="0">
                  <v-img :src="char.image"></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="pt-3">{{ char.name.primary }}</v-card-title>
                  <v-card-subtitle v-if="char.staff[0]">{{ char.staff[0].role }}: {{ char.staff[0].name }}</v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <h2 class="text-h5 mt-8 mb-4">关联作品</h2>
        <v-row>
          <v-col v-for="rel in relatedWorks" :key="rel.id" cols="12" md="6">
            <v-card variant="outlined">
              <div class="d-flex">
                <v-img :src="rel.images.poster" class="ma-2" max-width="60" :aspect-ratio="2/3" cover></v-img>
                <div>
                  <v-card-text class="pb-0">
                    <v-chip size="small">{{ rel.relationType }}</v-chip>
                  </v-card-text>
                  <v-card-title class="pt-1">{{ rel.title.chinese || rel.title.primary }}</v-card-title>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="d-flex justify-center align-center" style="height: 100vh;">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-container>
</template>

<style scoped>
/* 这里可以写这个组件专属的样式 */
</style>