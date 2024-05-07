import { type Options } from 'tsup'

export const tsup = (option: Options): Options => ({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  platform: 'node',
  splitting: false,
  treeshake: true,
  clean: !option.watch,
  minify: false,
  sourcemap: !!option.watch,
})
