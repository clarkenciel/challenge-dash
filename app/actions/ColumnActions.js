'use strict'

import { ColumnSectionTypes as CT } from '../ActionTypes.js'
import D from '../Dispatcher.js'

export function pin(name) {
  D.dispatch({
    type: CT.PIN,
    name
  })
}

export function unpin(name) {
  D.dispatch({
    type: CT.UNPIN,
    name
  })
}
