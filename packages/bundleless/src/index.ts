import { type ReplaceTscAliasPathsOptions, replaceTscAliasPaths } from 'tsc-alias'
import { type Options } from 'tsup'

export interface IBundleless {
  ext?: '.js' | '.mjs' | '.cjs'
  bundle?: boolean
  /**
   * @internal
   */
  _replaceTscAliasPathsOptions?: ReplaceTscAliasPathsOptions
}

type Plugin = Exclude<Options['plugins'], undefined>[number]

export function bundleless(options?: IBundleless): Plugin {
  return {
    name: 'tsup-plugin-bundleless',
    esbuildOptions(esbuildOptions) {
      const { bundle = false } = options || {}
      esbuildOptions.bundle = bundle
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
