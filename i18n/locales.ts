/**
 * 语言配置列表
 */
export const locales = [
  {
    code: 'en',
    file: { cache: true, path: 'en.json' },
    language: 'en-US',
    name: 'English',
  },
  {
    code: 'zh',
    file: { cache: true, path: 'zh.json' },
    language: 'zh-CN',
    name: '中文',
  }
] as const;

export type LocaleCode = typeof locales[number]['code'];
