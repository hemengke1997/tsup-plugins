# tsup-plugin-bundleless

## 安装

```bash
npm i tsup-plugin-bundleless -D
```

## 使用

```ts
// tsup.config.ts
import { bundleless } from 'tsup-plugin-bundleless'

const { plugins, esbuildPlugins } = bundleless({
  // options
})

export const tsup = defineConfig((option) => ({
  plugins,
  esbuildPlugins,
}))
```
