<script setup lang="ts">
definePageMeta({
  prerender: true
})

const { locale } = useI18n()

// 获取所有博客文章列表，并根据当前语言筛选
const { data: rawBlogs } = await useAsyncData(
  `blogs-${locale.value}`,
  async () => {
    const items = await queryCollection("blogs")
      .where('stem', 'LIKE', `%/${locale.value}`)
      .all()
    return items
  },
  {
    watch: [locale]
  }
)


const blogs = computed(() => {
  // stem : blogs/demo-1/en
  // 基于 stem 生成  href: blogs/demo
  return rawBlogs.value?.map(blog=>{
    const stemParts = blog.stem.split('/')
    const href = `/${stemParts.slice(0, -1).join('/')}` // 去掉最后的语言部分
    return {
      ...blog,
      href
    }
  })
})

</script>

<template>
  <div class="w-full min-h-screen overflow-auto flex flex-col items-center pt-24 px-4">
    <h1 class="text-4xl font-bold mb-8">博客列表</h1>
    
    <div class="w-full max-w-4xl space-y-4">
      <div 
        v-for="blog in blogs" 
        :key="blog.id"
        class="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <NuxtLinkLocale :to="blog.href" class="block">
          <h2 class="text-2xl font-semibold mb-2 text-blue-600 hover:text-blue-800">
            {{ blog.title || blog.stem }}
          </h2>
          <p class="text-gray-600">{{ blog.description }}</p>
        </NuxtLinkLocale>
      </div>
      
      <p v-if="!blogs || blogs.length === 0" class="text-center text-gray-500">
        暂无博客文章
      </p>

      <Debug :data="blogs" label="Blog List" />
    </div>
  </div>
</template>
