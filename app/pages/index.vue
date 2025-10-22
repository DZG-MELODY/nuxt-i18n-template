<script setup lang="ts">
</script>

<template>
  <div class="home-page w-full h-full flex flex-col items-center justify-center">
    <h1>{{ $t("welcome") }}</h1>
    <p>{{ $t("description") }}</p>
    <div class="my-5 text-yellow-300">
      <nuxt-link-locale to="/about" class="mr-4 underline">{{ $t("about") }}</nuxt-link-locale>
      <nuxt-link-locale to="/term" class="underline">{{ $t("terms") }}</nuxt-link-locale>
    </div>
  </div>
</template>