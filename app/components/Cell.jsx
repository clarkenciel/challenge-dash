'use strict'

import React from 'react'

export default function Cell({ data }) {
  return (
    <div className='data-cell'>
      <p>{ data }</p>
    </div>
  )
}
