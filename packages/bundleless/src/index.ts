import { replaceTscAliasPaths } from 'tsc-alias'
import { type Options } from 'tsup'

export function bundless(): Exclude<Options['plugins'], undefined>[number] {
  return {
    name: 'tsup-plugin-bundless',
    esbuildOptions(options) {
      options.bundle = false
    },
    buildEnd() {
      replaceTscAliasPaths({
        outDir: this.options.outDir,
        resolveFullPaths: true,
      })
    },
  }
}
