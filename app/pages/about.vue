<script setup lang="ts">
definePageMeta({
  prerender: true
})

const { locale } = useI18n()

const { data: about } = await useAsyncData(
  `about-${locale.value}`,
  async () => {
    return queryCollection("about")
      .where('stem', 'LIKE', `%${locale.value}`)
      .first()
  },
  {
    watch: [locale]
  }
)
</script>

<template>
  <div class="w-full h-full overflow-auto flex flex-col items-center justify-center">
    <p class="pt-20">{{ locale }}</p>
    <h1>{{ about?.title }}</h1>
    <p>{{ about?.content }}</p>
  </div>
</template>