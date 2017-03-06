'use strict'

import reqwest from 'reqwest'
import { compose, prop } from 'ramda'

import * as AdActions from '../actions/Ad.js'
import Ad from '../tables/Ad.js'

const ads = compose(prop('ads'), x => JSON.parse(x), prop('response'))

export function loadAll() {
  reqwest({
    url: '/api/v1/ads',
    method: 'get'
  }).
    then(resp => {
      const as = ads(resp)
      return AdActions.loaded(Ad.fromArray(as))
    }).
    fail(AdActions.loadError)
}
