import { describe, expect, test } from 'vitest'
import { excludeFilter } from '../src/util'

describe('bundleless', () => {
  test('should exclude string', () => {
    expect(excludeFilter(['.css'], './index.css')).toBe(true)
  })

  test('should exclude regexp', () => {
    expect(excludeFilter([/\.css$/], './index.css')).toBe(true)
  })

  test('should not exclude string', () => {
    expect(excludeFilter(['.css'], './index.js')).toBe(false)
  })

  test('should not exclude regexp', () => {
    expect(excludeFilter([/\.css$/], './index.js')).toBe(false)
  })

  test('should mix exclude string and regexp', () => {
    expect(excludeFilter(['.js', /\.css$/], './index.css')).toBe(true)
    expect(excludeFilter(['.css', /\.ts$/], './index.js')).toBe(false)
  })
})
