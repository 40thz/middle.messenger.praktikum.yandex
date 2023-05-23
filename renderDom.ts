// import { error, home, notFound, profile, signin, signup } from '../pages'

import Component from './src/modules/Component'

export function render(query: string, block: Component) {
  const root = document.querySelector(query)

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`)
  }

  root.innerHTML = ''

  root.append(block.getContent()!)

  return root
}
