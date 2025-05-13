import { defineConfig } from '@minko-fe/eslint-config'

export default defineConfig([
  {
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
])
