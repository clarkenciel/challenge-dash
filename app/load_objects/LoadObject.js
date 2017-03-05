'use strict'

import { clone, cloneWith } from '../utils/Cloneable.js'

/* LoadObject
 * LoadObjects represent pieces of data that need to be loaded
 * from the server and the status of the related loading process. */

// types of operation
const [ NONE, CREATING, LOADING, UPDATING, DELETING ]
  = [ 'NONE', 'CREATING', 'LOADING', 'UPDATING', 'DELETING' ]

// prototypal object
const EmptyLoadObject = { 
  _op: NONE, 
  _val: undefined, 
  _err: undefined, 
  _hasVal: false,

  clone, cloneWith,
  
  /* getters */
  operation() { return this._op },
  value() { return this._val },
  error() { return this._err },

  /* validators */
  hasOperation() { return this._op !== NONE },
  hasValue() { return this._hasVal },
  hasError() { return !!this._err },
  isEmpty() { 
    return !this.hasValue() && !this.hasOperation() && !this.hasError() 
  },

  /* setters */
  setOperation(op) {
    if (this.hasOperation() && this.operation() === op) 
      return this
    return this.cloneWith({ _op: op })
  },

  setValue(val) {
    if (this.hasValue() && this.value() === val)
      return this
    return this.cloneWith({ _val: val, _hasVal: true })
  },

  setError(err) {
    if (this.hasError() && this.error() === err)
      return this
    return this.cloneWith({ _err: err })
  },

  /* removing */
  removeOperation() { return this.setOperation(NONE) },
  removeValue() { return this.setValue(undefined) },
  removeError() { return this.setError(undefined) },

  /* it's a functor */
  fmap(fn) {
    if (!this.hasValue()) {
      return this
    }
    return this.setValue(fn(this.value()))
  },

  /* status checks */
  isDone() { return !this.hasOperation() },
  isCreating() { return this.operation() === CREATING },
  isLoading() { return this.operation() === LOADING },
  isUpdating() { return this.operation() === UPDATING },
  isDeleting() { return this.operation() === DELETING }
}

/* exported constructors */
export default {
  empty: () => EmptyLoadObject,
  creating: () => EmptyLoadObject.setOperation(CREATING),
  loading: () => EmptyLoadObject.setOperation(LOADING),
  deleting: () => EmptyLoadObject.setOperation(DELETING),
  withError: (error) => EmptyLoadObject.setError(error),
  withValue: (val) => EmptyLoadObject.setValue(val),
}
