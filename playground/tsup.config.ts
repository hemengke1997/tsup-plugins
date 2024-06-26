import { defineConfig } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

export default defineConfig(() => {
  return {
    entry: ['src/**/*.ts'],
    format: ['cjs'],
    platform: 'node',
    target: 'es2020',
    outDir: 'dist/es',
    clean: true,
    minify: false,
    outExtension: () => ({ js: '.cjs' }),
    plugins: [
      bundleless({
        ext: '.cjs',
      }),
    ],
  }
})
