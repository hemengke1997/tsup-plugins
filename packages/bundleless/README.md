# tsup-plugin-bundleless

> File-to-file build for tsup

## Install

```bash
npm i tsup-plugin-bundleless -D
```

## Uage

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
