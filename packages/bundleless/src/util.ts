import { type IBundleless } from '.'

export function excludeFilter(exclude: IBundleless['exclude'], target: string) {
  return exclude?.some((t) => {
    if (typeof t === 'string') {
      return target.endsWith(t)
    }
    return t.test(target)
  })
}
