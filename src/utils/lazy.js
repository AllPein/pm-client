import { lazy } from 'react'

const lazyLoader = (resolver, name = 'default') => {
  return lazy(async () => {
    const resolved = await resolver()
    return { default: resolved[name] }
  })
}

export {
  lazyLoader as lazy
}
