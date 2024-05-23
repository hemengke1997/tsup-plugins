import { defineConfig } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

export default defineConfig(() => {
  return {
    entry: ['src/**/*.ts'],
    format: 'esm',
    platform: 'node',
    target: 'es2020',
    outDir: 'dist/es',
    clean: true,
    minify: false,
    outExtension: () => ({ js: '.js' }),
    bundle: false,
    plugins: [
      bundleless({
        ext: '.js',
        _replaceTscAliasPathsOptions: {
          debug: true,
        },
      }),
    ],
  }
})
