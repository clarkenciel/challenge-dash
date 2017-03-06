'use strict'

import { Container } from 'flux/utils'

import App from '../components/App.jsx'
import TableStore from '../stores/TableStore.js'
import MetricActions from '../actions/Metric.js'
import AdActions from '../actions/Ad.js'

function getStores() {
  return [
    TableStore
  ]
}

function getState() {
  const { ads, metrics, lockedColumns, freeColumns, errors, table } = TableStore.getState()
  ads.loadObject()
  metrics.loadObject()
  // debugger

  return {
    errors: errors.concat(table.hasError() ? table.error() : []),
    loading: table.isLoading(),
    tableData: {
      lockedColumns,
      freeColumns,
      table: table.hasValue() ? table.value() : null
    }
  }
}

export default Container.createFunctional(
  App, getStores, getState
)
