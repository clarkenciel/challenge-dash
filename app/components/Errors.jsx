'use strict'

import React from 'react'
import Error from './Error.jsx'

export default function Errors({ errors }) {
  const errs = errors.map((e, i) => <Error {...e} key={i} />)
  return (
    <div className='errors-holder'>
      { errs }
    </div>
  )
}
