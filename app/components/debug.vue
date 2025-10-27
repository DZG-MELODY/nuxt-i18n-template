<script setup lang="ts">


const props = withDefaults(defineProps<{
  data?: any
  label?: string
  collapsed?: boolean
}>(), {
  label: 'Debug',
  collapsed: false
})

const isCollapsed = ref(props.collapsed)

const toggle = () => {
  isCollapsed.value = !isCollapsed.value
}

// 格式化数据
const formattedData = computed(() => {
  try {
    return JSON.stringify(props.data, null, 2)
  } catch (e) {
    return String(props.data)
  }
})

// 获取数据类型
const dataType = computed(() => {
  if (props.data === null) return 'null'
  if (Array.isArray(props.data)) return 'array'
  return typeof props.data
})
</script>

<template>
  <DevOnly>
    <div class="debug-component not-prose" style="margin: 1rem 0; font-family: monospace;">
      <div class="debug-header" style="
          background: #1e293b;
          color: #e2e8f0;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        " @click="toggle">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-weight: 600; color: #38bdf8;">🐛 {{ label }}</span>
          <span style="
              font-size: 0.75rem;
              color: #94a3b8;
              background: #334155;
              padding: 0.125rem 0.5rem;
              border-radius: 0.25rem;
            ">
            {{ dataType }}
          </span>
        </div>
        <span style="color: #94a3b8; font-size: 0.875rem;">
          {{ isCollapsed ? '▶' : '▼' }}
        </span>
      </div>

      <div v-show="!isCollapsed" class="debug-content" style="
          background: #0f172a;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0 0 0.5rem 0.5rem;
          overflow-x: auto;
          max-height: 400px;
          border: 1px solid #334155;
          border-top: none;
        ">
        <pre style="margin: 0; font-size: 0.875rem; line-height: 1.5;">{{ formattedData }}</pre>
      </div>
    </div>
  </DevOnly>
</template>

<style scoped>
.debug-component {
  --tw-prose-body: inherit;
  --tw-prose-headings: inherit;
}

.debug-content::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.debug-content::-webkit-scrollbar-track {
  background: #1e293b;
  border-radius: 4px;
}

.debug-content::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.debug-content::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
