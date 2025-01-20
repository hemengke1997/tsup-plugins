import { defineConfig } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

export default defineConfig(() => {
  return {
    entry: ['src/**/*.{ts,css}'],
    format: ['cjs', 'esm'],
    platform: 'neutral',
    target: 'es2020',
    dts: true,
    clean: true,
    minify: false,
    ...bundleless({ exclude: ['.css'] }),
  }
})
