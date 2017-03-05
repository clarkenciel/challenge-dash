'use strict'

import { ReduceStore } from 'flux/utils'
import { List } from 'immutable'

import Dispatcher from '../Dispatcher.js'
import MetricActions from '../actions/Metrics.js'
import AdActions from '../actions/Ads.js'
import { MetricTypes as MT, AdTypes as AT } from '../ActionTypes.js'

class TableStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    return {
      ads: LOS.create(AdActions.loadAll),
      metrics: LOS.create(() => null),
      table: LO.loading(),
      lockedColumns: new Set(['name']),
      freeColumns: new Set([]),
      errors: List()
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case AT.START_LOAD:
        ADM.loadAll()
        state.posts = state.posts.fmap(_ => LO.loading())
        return Object.create(state)

      case AT.LOADED:
        state.ads = state.ads.fmap(lo => lo.setValue(action.ads))
        state.metrics = LOS.create(() => MetricActions.byAdId(action.ads.rows.map(a => a.id)))
        return Object.create(state)

      case AT.LOAD_ERROR:
        state.ads = state.ads.fmap(lo => lo.setError(action.error))
        return Object.create(state)

      case MT.START_LOAD:
        MDM.byAdId(action.ids)
        state.metrics = state.metrics.fmap(_ => LO.loading())
        return Object.create(state)

      case MT.LOADED:
        const aLo = state.ads.loadObject
        state.metrics = state.metrics.fmap(lo => lo.setValue(action.metrics))
        if (aLo.hasError()) {
          state.table = state.table.setError(aLo.error())
        }
        else {
          state.table = state.table.setValue(action.metrics.join(aLo).on('remote_id'))
          state.freeColumns = state.table.columns.subtract(state.lockedColumns)
        }
        return Object.create(state)

      case MT.LOAD_ERROR:
        state.metrics = state.metrics.fmap(lo => lo.setError(action.error))
        return Object.create(state)

      default:
        return state
    }
  }
}
