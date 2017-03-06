'use strict'

import { ReduceStore } from 'flux/utils'
import { List, Set } from 'immutable'

import Dispatcher from '../Dispatcher.js'
import LOS from '../load_objects/LoadObjectState.js'
import LO from '../load_objects/LoadObject.js'
import * as MetricActions from '../actions/Metric.js'
import * as AdActions from '../actions/Ad.js'
import * as ADM from '../apis/Ads.js'
import * as MDM from '../apis/Metrics.js'
import { MetricTypes as MT, AdTypes as AT, ColumnSectionTypes as CT } from '../ActionTypes.js'

class TableStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    return {
      ads: LOS.create(AdActions.loadAll),
      metrics: LOS.create(() => null),
      table: LO.loading(),
      lockedColumns: Set(['name']),
      freeColumns: Set([]),
      errors: List()
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case AT.START_LOAD:
        ADM.loadAll()
        state.ads = state.ads.setLoadObject(LO.loading())
        return Object.create(state)

      case AT.LOADED:
        state.ads = state.ads.setLoadObject(LO.withValue(action.table))
        state.metrics = LOS.create(() => 
          MetricActions.byAdIds(action.table.rows.map(a => a.id)))
        return Object.create(state)

      case AT.LOAD_ERROR:
        state.ads = state.ads.fmap(lo => lo.setError(action.error))
        return Object.create(state)

      case MT.START_LOAD_BY_IDS:
        MDM.byAdIds(action.ids)
        state.metrics = state.metrics.fmap(_ => LO.loading())
        return Object.create(state)

      case MT.LOADED_BY_IDS:
        const aLo = state.ads.loadObject()
        state.metrics = state.metrics.setLoadObject(LO.withValue(action.table))

        if (aLo.hasError()) {
          state.table = LO.withError(aLo.error())
        }
        else if (aLo.isLoading()) {}
        else {
          const joined = action.table.join(aLo.value()).on('remote_id')
          const free = joined.columns.subtract(state.lockedColumns)
          state.table = LO.withValue(joined)
          state.freeColumns = free
        }
        return Object.create(state)

      case MT.LOAD_ERROR:
        state.metrics = state.metrics.fmap(lo => lo.setError(action.error))
        return Object.create(state)

      case CT.PIN:
        const toPin = Set([action.name])
        state.lockedColumns = state.lockedColumns.union(toPin)
        state.freeColumns = state.freeColumns.subtract(toPin)
        return Object.create(state)

      case CT.UNPIN:
        const toUnPin = Set([action.name])
        state.lockedColumns = state.lockedColumns.subtract(toUnPin)
        state.freeColumns = state.freeColumns.union(toUnPin)
        return Object.create(state)

      default:
        return state
    }
  }
}


export default new TableStore()
