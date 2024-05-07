import { type ReplaceTscAliasPathsOptions, replaceTscAliasPaths } from 'tsc-alias'
import { type Options } from 'tsup'

export interface IBundleless {
  ext?: '.js' | '.mjs' | '.cjs'
  /**
   * @internal
   */
  _replaceTscAliasPathsOptions?: ReplaceTscAliasPathsOptions
}

export function bundleless(options?: IBundleless): Exclude<Options['plugins'], undefined>[number] {
  return {
    name: 'tsup-plugin-bundleless',
    esbuildOptions(options) {
      options.bundle = false
    },
    async buildEnd() {
      await replaceTscAliasPaths({
        outDir: this.options.outDir,
        resolveFullPaths: true,
        watch: false,
        resolveFullExtension: options?.ext,
        ...options?._replaceTscAliasPathsOptions,
      })
    },
  }
}
