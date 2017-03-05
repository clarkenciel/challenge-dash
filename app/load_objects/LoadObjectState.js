'use strict'

/* Load Object State
 * provides an interface similar to a LoadObjectMap,
 * but represents state represented by a single Load Object. */

import LO from './LoadObject.js'
import { clone, cloneWith } from '../utils/Cloneable.js'

const emptyCheck = lo => lo.isEmpty()

const LoadObjectState = {
  _d: LO.empty(),
  _load: null, // fn for loading the contained object
  _shouldLoad: emptyCheck,
  _shouldBlockLoads: false,
  _clearBlockedLoads: null, // will be a timeout

  clone, cloneWith,

  loadObject() {
    if (!this._shouldBlockLoads && this._shouldLoad(this._d)) {
      this._shouldBlockLoads = true
      this._clearBlockedLoads = setTimeout(
        () => {
          this._load()
          this._shouldBlockLoads = false
          this._clearBlockedLoads = null
        },
        0
      )
    }
    return this._d
  },

  setLoadObject(nuLo) {
    if (nuLo === this.loadObject()) return this
    return this.cloneWith({ _d: nuLo })
  },

  fmap(fn) {
    const lo = this.loadObject().fmap(fn)
    if (lo === this.loadObject()) return this
    return this.cloneWith({ _d: lo })
  }
}
console.log(LoadObjectState)

export default {
  create: (load, shouldLoad) => LoadObjectState.cloneWith({
    _load: load, _shouldLoad: shouldLoad || emptyCheck
  })
}
