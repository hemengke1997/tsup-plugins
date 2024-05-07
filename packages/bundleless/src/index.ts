import { replaceTscAliasPaths } from 'tsc-alias'
import { type Options } from 'tsup'

export interface IBundleless {
  ext?: '.js' | '.mjs' | '.cjs'
}

export function bundleless(options?: IBundleless): Exclude<Options['plugins'], undefined>[number] {
  return {
    name: 'tsup-plugin-bundleless',
    esbuildOptions(options) {
      options.bundle = false
    },
    buildEnd() {
      replaceTscAliasPaths({
        outDir: this.options.outDir,
        resolveFullPaths: true,
        resolveFullExtension: options?.ext,
      })
    },
  }
}
