import { type OnResolveArgs, type Plugin } from 'esbuild'
import isBuiltinModule from 'is-builtin-module'
import { readPackage } from 'read-pkg'
import resolve from 'resolve'
import { replaceTscAliasPaths, type ReplaceTscAliasPathsOptions } from 'tsc-alias'
import { type Options } from 'tsup'
import { excludeFilter } from './util'

type TsupPlugin = Exclude<Options['plugins'], undefined>[number]

export interface IBundleless {
  ext?: '.js' | '.mjs' | '.cjs'
  /**
   * bundless 排除的文件。如果被排除，则会被 esbuild bundle
   *
   * @example ['.css', /\.css$/]
   */
  exclude?: (string | RegExp)[]
  cwd?: string
  /**
   * @internal
   */
  _replaceTscAliasPathsOptions?: ReplaceTscAliasPathsOptions
}

class Bundless {
  constructor(private options?: IBundleless) {}

  private async loadPkg(cwd: string) {
    const pkg = await readPackage({ cwd })
    return pkg
  }

  private isSourceCode(args: OnResolveArgs, cwd: string): boolean {
    if (isBuiltinModule(args.path)) {
      return false
    }

    try {
      const resolvedPath = resolve.sync(args.path, { basedir: cwd })
      return !resolvedPath.includes('node_modules')
    } catch {
      if (args.importer.includes('node_modules')) {
        return false
      }
      return true
    }
  }

  private tsupPlugin(): TsupPlugin {
    const bundleless = this
    return {
      name: 'tsup-plugin-bundleless',
      async buildEnd() {
        let ext = bundleless.options?.ext || (this.options.outExtension?.(this).js as IBundleless['ext'])

        if (!ext) {
          let { type } = await bundleless.loadPkg(bundleless.options?.cwd || process.cwd())

          const format = {
            module: {
              esm: '.js',
              cjs: '.cjs',
              iife: '.js',
            },
            commonjs: {
              esm: '.mjs',
              cjs: '.js',
              iife: '.js',
            },
          } as const

          if (!type) {
            type = 'commonjs'
          }
          ext = format[type][this.format]
        }
        await replaceTscAliasPaths({
          outDir: this.options.outDir,
          resolveFullPaths: true,
          watch: false,
          resolveFullExtension: ext,
          fileExtensions: {
            inputGlob: ext.split('.')[1],
          },
          ...bundleless.options?._replaceTscAliasPathsOptions,
        })
      },
    }
  }

  private esbuildPlugin(): Plugin {
    return {
      name: 'bundleless',
      setup: (build) => {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.kind === 'entry-point') return

          if (excludeFilter(this.options?.exclude, args.path)) {
            return undefined
          }

          if (this.isSourceCode(args, this.options?.cwd || process.cwd())) {
            return {
              external: true,
            }
          }
        })
      },
    }
  }

  /**
   * tsup plugins
   */
  get plugins(): any {
    return [this.tsupPlugin()]
  }

  /**
   * esbuild plugins
   */
  get esbuildPlugins(): any {
    return [this.esbuildPlugin()]
  }
}

export const bundleless = (options?: IBundleless) => {
  const { esbuildPlugins, plugins } = new Bundless(options)
  return {
    esbuildPlugins,
    plugins,
  }
}
