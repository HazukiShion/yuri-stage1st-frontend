<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

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
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>筛选</v-card-title>
          <v-card-text>
            这里未来会放筛选器。
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row>
          <v-col v-for="work in works" :key="work.id" cols="12" sm="6" md="4">
            <RouterLink :to="`/works/${work.id}`" class="text-decoration-none">
              <v-card hover>
                <v-img :src="work.images.poster" :aspect-ratio="2/3" cover></v-img>
                <v-card-title>{{ work.title.chinese || work.title.primary }}</v-card-title>
                <v-card-subtitle>{{ work.type.main }} / {{ work.type.sub }}</v-card-subtitle>
              </v-card>
            </RouterLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>