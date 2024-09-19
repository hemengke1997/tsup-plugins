import { defineConfig } from 'tsup'
import { tsup } from '../../tsup.config'

export default defineConfig((option) => ({
  ...tsup(option),
  banner(ctx) {
    return {
      js:
        ctx.format === 'esm'
          ? `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
          : '',
    }
  },
  external: ['fsevents'],
  noExternal: ['tsc-alias'],
  target: 'node18',
}))
