<script setup lang="ts">
definePageMeta({
  prerender: true
})

const route = useRoute()
const { locale, t } = useI18n()

// 获取 URL 参数
const slug = computed(() => route.params.slug)

// 根据 slug 和当前语言获取单篇博客文章
const { data: blog } = await useAsyncData(
  () => `blog-${slug.value}-${locale.value}`,
  async () => {
    // 精确匹配当前语言的文章：/blogs/<slug>/<locale>
    return await queryCollection("blogs")
      .where('stem', 'LIKE', `%blogs/${slug.value}/${locale.value}`)
      .first()
  },
  {
    // 当语言或 slug 变化时，自动重新获取
    watch: [locale, slug]
  }
)

// SSR 场景下未找到则返回 404；客户端切换语言时不立刻抛错，等待数据刷新
if (import.meta.server && !blog.value) {
  throw createError({ statusCode: 404, message: `文章未找到 ${slug.value} (${locale.value})` })
}
</script>

<template>
  <div class="w-full min-h-screen overflow-auto flex flex-col items-center pt-24 px-4">
    <article class="w-full max-w-4xl">
      <!-- 返回按钮 -->
      <NuxtLinkLocale to="/blogs" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        {{ t("return_to_blog_list") }}
      </NuxtLinkLocale>

      <!-- 文章标题 -->
      <h1 class="text-4xl font-bold mb-4">
        {{ blog?.title }}
      </h1>

      <!-- 文章元信息 -->
      <div class="text-gray-500 mb-8">
        <span>slug: {{ slug }}</span>
        <span class="mx-2">|</span>
        <span>locale: {{ locale }}</span>
      </div>

      <!-- 文章内容 -->
      <div class="prose prose-lg max-w-none">
        <ContentRenderer v-if="blog" :value="blog" />
        <p v-else>加载中...</p>
      </div>

      <!-- Debug 组件示例 -->
      <Debug :data="blog" label="Blog Data" />

      <Debug :data="{ slug: slug, locale, route: route.params }" label="Route Info" collapsed />
    </article>
  </div>
</template>

<i18n lang="json">{
  "en": {
    "return_to_blog_list": "← Back to Blog List"
  },
  "zh": {
    "return_to_blog_list": "← 返回博客列表"
  }
}</i18n>