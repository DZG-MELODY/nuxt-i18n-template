<script setup lang="ts">
const { locale } = useI18n()

const { data: term } = await useAsyncData(
  `term-${locale.value}`,
  () => {
    return queryCollection("term")
      .where('stem', 'LIKE', `%${locale.value}`)
      .first()
  },
  {
    watch: [locale]
  }
)
</script>

<template>
  <div class="terms-page w-full h-full flex flex-col items-center justify-center">
    <h1>{{ term?.title }}</h1>
    <p>{{ term?.content }}</p>
  </div>
</template>