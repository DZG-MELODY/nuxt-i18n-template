# VSCode Nuxt 调试配置指南

## 🎯 已配置的调试环境

项目已完成 VSCode 调试环境配置，支持在开发过程中使用断点进行调试。

## 📁 配置文件

### 1. `.vscode/launch.json`
包含以下调试配置：

#### 可用的调试配置：

1. **Nuxt: Client** 
   - 启动 Nuxt 开发服务器（Node.js 端）
   - 可以调试服务器端代码

2. **Nuxt: Chrome**
   - 在 Chrome 浏览器中调试客户端代码
   - 需要先启动开发服务器（http://localhost:3000）

3. **Nuxt: Server**
   - 启动服务器并自动打开浏览器
   - 服务器端调试

4. **Nuxt: Full Stack** (推荐)
   - 同时调试服务器端和客户端
   - 组合了服务器和 Chrome 调试

### 2. `nuxt.config.ts`
已添加以下配置以支持调试：

```typescript
sourcemap: {
  server: true,
  client: true
},
vite: {
  build: {
    sourcemap: true
  }
}
```

### 3. `.vscode/settings.json`
优化了调试体验的设置。

## 🚀 使用方法

### 方法 1：使用 VSCode 调试面板（推荐）

1. **打开调试面板**
   - 点击左侧活动栏的"运行和调试"图标
   - 或使用快捷键：`Cmd+Shift+D` (macOS) / `Ctrl+Shift+D` (Windows/Linux)

2. **选择调试配置**
   在调试面板顶部的下拉菜单中选择：
   - `Nuxt: Full Stack` - 全栈调试（推荐）
   - `Nuxt: Client` - 仅调试 Node.js 服务器
   - `Nuxt: Chrome` - 仅调试浏览器客户端
   - `Nuxt: Server` - 服务器调试

3. **开始调试**
   - 点击绿色播放按钮或按 `F5`
   - 调试器会启动并自动附加到进程

### 方法 2：使用快捷键

- `F5` - 开始调试（使用当前选择的配置）
- `Shift+F5` - 停止调试
- `Ctrl+Shift+F5` - 重启调试

## 🔍 设置断点

### 在 Vue 组件中设置断点：

1. 打开 `.vue` 文件（例如 `app/pages/about.vue`）
2. 在 `<script setup>` 部分，点击行号左侧设置断点
3. 运行调试器
4. 当代码执行到断点时，会自动暂停

**示例：**

```vue
<script setup lang="ts">
const { locale } = useI18n()

// 点击这行的行号左侧设置断点
const { data: about } = await useAsyncData(
  `about-${locale.value}`,
  async () => {
    const items = await queryCollection("about")
      .where('lang', '=', locale.value)
      .all()
    // 也可以在这里设置断点
    return items[0] || null
  },
  {
    watch: [locale]
  }
)
</script>
```

### 在配置文件中设置断点：

- `nuxt.config.ts`
- `content.config.ts`
- composables、utils 等

## 🛠️ 调试技巧

### 1. 查看变量值
当代码在断点处暂停时：
- 左侧调试面板会显示当前作用域的所有变量
- 鼠标悬停在变量上可以查看其值
- 在"监视"面板添加表达式进行监视

### 2. 调试控制
- `F10` - 单步跳过（Step Over）
- `F11` - 单步进入（Step Into）
- `Shift+F11` - 单步跳出（Step Out）
- `F5` - 继续执行

### 3. 条件断点
- 右键点击断点红点
- 选择"编辑断点"
- 输入条件表达式（例如：`locale.value === 'zh'`）
- 只有条件为真时才会暂停

### 4. 日志点（Logpoint）
- 右键点击行号
- 选择"添加日志点"
- 输入要记录的消息
- 不会暂停代码，只在调试控制台输出日志

### 5. 调试控制台
- 在断点处暂停时，可以在调试控制台执行任意 JavaScript 表达式
- 查看和修改变量值
- 测试代码片段

## 📝 常见问题

### Q: 断点显示为灰色圆点？
**A:** 这通常表示 source map 没有正确加载。解决方法：
1. 停止调试器
2. 删除 `.nuxt` 文件夹：`rm -rf .nuxt`
3. 重启开发服务器
4. 重新开始调试

### Q: 无法在 Vue 文件中设置断点？
**A:** 确保：
1. 已安装 Vue Language Features (Volar) 扩展
2. 断点设置在 `<script>` 部分而非 `<template>` 部分
3. Source maps 已启用（已在 nuxt.config.ts 中配置）

### Q: Chrome 调试器无法连接？
**A:** 
1. 确保开发服务器正在运行（http://localhost:3000）
2. 检查端口 3000 是否被占用
3. 尝试使用 `Nuxt: Full Stack` 配置

### Q: 想调试特定端口？
**A:** 修改 `.vscode/launch.json` 中的 `url` 字段：
```json
{
  "type": "chrome",
  "url": "http://localhost:你的端口号"
}
```

## 🎯 实战示例

### 示例 1：调试语言切换逻辑

1. 打开 `app/components/language-switch.vue`
2. 在切换语言的函数中设置断点
3. 启动 `Nuxt: Full Stack` 调试
4. 在浏览器中点击语言切换按钮
5. VSCode 会在断点处暂停，可以查看语言切换的全过程

### 示例 2：调试内容查询

1. 打开 `app/pages/about.vue`
2. 在 `queryCollection` 调用处设置断点
3. 启动调试
4. 访问 about 页面
5. 查看查询参数和返回结果

### 示例 3：调试 i18n 配置

1. 打开 `nuxt.config.ts`
2. 在 i18n 配置部分设置断点
3. 启动调试
4. 观察配置加载过程

## 🌟 最佳实践

1. **使用 Full Stack 调试** - 同时调试前端和后端，获得完整的调试体验
2. **善用条件断点** - 避免在循环中频繁暂停
3. **利用监视表达式** - 持续跟踪关键变量的变化
4. **使用日志点** - 不中断执行流程的情况下记录信息
5. **保持 source maps 启用** - 确保调试时能看到原始源代码

## 📚 相关资源

- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
- [Nuxt 调试指南](https://nuxt.com/docs/guide/going-further/debugging)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

现在你可以愉快地使用断点调试 Nuxt 应用了！🎉
