'use strict'

import { AdTypes as AT } from '../ActionTypes.js'
import D from '../Dispatcher.js'

export function loadAll() {
  D.dispatch({
    type: AT.START_LOAD
  })
}

export function loaded(table) {
  D.dispatch({
    type: AT.LOADED,
    table
  })
}

export function loadError(err, msg) {
  D.dispatch({
    type: AT.LOAD_ERROR,
    err, msg
  })
}
