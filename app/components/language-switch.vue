<script setup lang="ts">
const { locale, locales } = useI18n();
</script>

<template>
  <div class="fixed h-20 left-0 top-0 right-0 flex items-center space-x-4 px-6 bg-white/80 backdrop-blur-sm shadow-sm z-50">
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600 mr-2">Language:</span>
      <SwitchLocalePathLink
        v-for="loc in locales"
        :key="loc.code"
        :locale="loc.code"
        :class="[
          'px-3 py-1 rounded-md transition-all duration-200',
          locale === loc.code
            ? 'bg-blue-500 text-white font-semibold shadow-md'
            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
        ]"
      >
        {{ loc.name }}
      </SwitchLocalePathLink>
    </div>
  </div>
</template>