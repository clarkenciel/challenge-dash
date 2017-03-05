'use strict'

import reqwest from 'reqwest'
import { compose, path } from 'ramda'

import AdActions from '../actions/Ads.js'
import Ad from '../tables/Ad.js'

const ads = path('content', 'ads')

const success = compose(AdActions.loaded, Ad.fromArray, ads)

export loadAll() {
  reqwest({
    url: '/api/v1/ads',
    method: 'get'
  }).
    then(success).
    fail(AdActions.loadError)
}
