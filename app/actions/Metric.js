'use strict'

import { MetricTypes as MT } from '../ActionTypes.js'
import D from '../Dispatcher.js'

export function byAdIds(ids) {
  D.dispatch({
    type: MT.START_LOAD_BY_IDS,
    ids
  })
}

export function loaded(table) {
  D.dispatch({
    type: MT.LOADED_BY_IDS,
    table
  })
}

export function loadError(err, msg) {
  D.dispatch({
    type: MT.LOAD_ERROR,
    err, msg
  })
}
