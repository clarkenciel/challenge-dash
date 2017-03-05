'use strict'

function clone() { return Object.create(this) }

function cloneWith(props) {
  const nu = this.clone()
  Object.keys(props).forEach(k => nu[k] = props[k])
  return nu
}

export { clone, cloneWith }
