import { type Options } from 'tsup'

export function cssLegacy(): Exclude<Options['plugins'], undefined>[number] {
  return {
    name: 'tsup-plugin-css-legacy',
    esbuildOptions(options) {
      // https://esbuild.github.io/api/#supported
      const cssUnSupported = [
        'color-functions',
        'gradient-double-position',
        'gradient-interpolation',
        'gradient-midpoints',
        'hwb',
        'hex-rgba',
        'inline-style',
        'inset-property',
        'is-pseudo-class',
        'modern-rgb-hsl',
        'nesting',
        'rebecca-purple',
      ]
      options.supported ??= {}
      cssUnSupported.forEach((css) => {
        options.supported![css] = false
      })
    },
  }
}
