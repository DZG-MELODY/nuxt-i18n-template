# 页面内容国际化功能指南

## 功能说明

该功能实现了根据当前页面语言自动获取对应的页面内容。当用户切换语言时，页面内容会自动更新为对应语言的内容。

## 实现原理

### 1. 目录结构

页面内容存储在 `app/content/pages/` 目录下，按照以下结构组织：

```text
app/content/pages/
├── about/
│   ├── en.json    # 英文内容
│   └── zh.json    # 中文内容
└── term/
    ├── en.json    # 英文内容
    └── zh.json    # 中文内容
```

### 2. 内容配置

在 `content.config.ts` 中定义了内容集合（collections）：

```typescript
export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'data',
      source: 'pages/about/**.json',
      schema: pageSchema
    }),
    term: defineCollection({
      type: 'data',
      source: 'pages/term/**.json',
      schema: pageSchema
    })
  }
})
```

### 3. 页面实现

在页面组件中使用以下代码来获取当前语言的内容：

```vue
<script setup lang="ts">
const { locale } = useI18n()

const { data: about } = await useAsyncData(
  `about-${locale.value}`,
  () => {
    return queryCollection("about")
      .where('_stem', '=', `/${locale.value}`)
      .first()
  },
  {
    watch: [locale]  // 监听语言变化，自动重新获取数据
  }
)
</script>

<template>
  <div>
    <h1>{{ about?.title || $t("title") }}</h1>
    <p>{{ about?.content || $t("content") }}</p>
  </div>
</template>
```

## 关键点说明

1. **`useI18n()`**: 获取当前语言状态
2. **`useAsyncData()`**: 异步获取数据，支持服务端渲染
3. **`queryCollection()`**: 查询 Nuxt Content 集合
4. **`.where('_stem', '=', \`/${locale.value}\`)`**: 根据语言代码过滤内容
5. **`watch: [locale]`**: 监听语言变化，自动重新获取对应语言的内容
6. **`|| $t("...")`**: 提供备用翻译，当内容未加载时使用 i18n 翻译

## 添加新页面

要为新页面添加国际化内容支持，按以下步骤操作：

### 1. 创建内容文件

在 `app/content/pages/` 下创建新的目录和内容文件：

```text
app/content/pages/
└── your-page/
    ├── en.json
    └── zh.json
```

### 2. 定义内容 Schema

在 `content.config.ts` 中添加新的集合：

```typescript
export default defineContentConfig({
  collections: {
    // ... 现有集合
    yourPage: defineCollection({
      type: 'data',
      source: 'pages/your-page/**.json',
      schema: pageSchema  // 或自定义 schema
    })
  }
})
```

### 3. 在页面中使用

创建 `app/pages/your-page.vue`：

```vue
<script setup lang="ts">
const { locale } = useI18n()

const { data: pageData } = await useAsyncData(
  `your-page-${locale.value}`,
  () => {
    return queryCollection("yourPage")
      .where('_stem', '=', `/${locale.value}`)
      .first()
  },
  {
    watch: [locale]
  }
)
</script>

<template>
  <div>
    <h1>{{ pageData?.title }}</h1>
    <p>{{ pageData?.content }}</p>
  </div>
</template>
```

## 优势

1. ✅ **自动响应**: 语言切换时自动更新内容
2. ✅ **类型安全**: 使用 TypeScript 和 Zod schema 确保数据类型正确
3. ✅ **SSR 支持**: 支持服务端渲染，SEO 友好
4. ✅ **易于维护**: 内容和代码分离，便于管理和更新
5. ✅ **可扩展**: 轻松添加新语言和新页面

## 示例

### 已实现的页面

- **About 页面** (`/about`): 展示关于我们的信息
- **Term 页面** (`/term`): 展示条款和条件

当用户通过 `LanguageSwitch` 组件切换语言时，这些页面会自动加载并显示对应语言的内容。
