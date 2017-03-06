'use strict'

import reqwest from 'reqwest'
import { compose, prop } from 'ramda'

import * as MetricActions from '../actions/Metric.js'
import Metric from '../tables/Metric.js'

const metrics = compose(x => JSON.parse(x), prop('response'))

export function byAdIds(ids) {
  reqwest({
    url: '/api/v1/metrics',
    data: { remote_ids: ids },
    method: 'get'
  }).then(resp => {
    const ms = metrics(resp)
    return MetricActions.loaded(Metric.from(ms))
  }).
    fail(MetricActions.loadError)
}
