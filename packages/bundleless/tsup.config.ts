import { defineConfig } from 'tsup'
import { tsup } from '../../tsup.config'

export default defineConfig((option) => ({
  ...tsup(option),
  external: ['fsevents'],
  noExternal: ['tsc-alias'],
}))
