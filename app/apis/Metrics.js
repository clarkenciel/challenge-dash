'use strict'

import reqwest from 'reqwest'
import { compose, prop } from 'ramda'

import MetricActions from '../actions/Ads.js'
import Metric from '../tables/Metric.js'

const metrics = prop('content')

const success = compose(MetricActions.loaded, Metric.from, content)

export byAdId(ids) {
  reqwest({
    url: '/api/v1/metrics',
    data: { remote_ids: ids },
    method: 'get'
  }).
    then(success).
    fail(MetricActions.loadError)
}
