'use strict'

import React from 'react'

export default function Error({ err, msg }) {
  return (
    <div className='error-holder'>
      <div className='error-msg'>
        <p>{ msg }</p>
      </div>
    </div>
  )
}
