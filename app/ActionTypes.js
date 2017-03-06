'use strict'

const AdTypes = {
  START_LOAD: 'ads/start-load',
  LOADED: 'ads/loaded',
  LOAD_ERROR: 'ads/load-error'
}

const MetricTypes = {
  START_LOAD_BY_IDS: 'metrics/start-load',
  LOADED_BY_IDS: 'metrics/loaded',
  LOAD_ERROR: 'metrics/load-error'
}

const ColumnSectionTypes = {
  PIN: 'colum-sections/pin',
  UNPIN: 'colum-sections/unpin',
}

export {
  AdTypes,
  MetricTypes,
  ColumnSectionTypes,
}
