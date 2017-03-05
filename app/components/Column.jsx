'use strict'

import React from 'react'
import Cell from './Cell.jsx'

export default function Column({ header, data }) {
  const cells = rows.map((d, k) => <Cell key={ k } data={ d } />)

  return (
    <div className='column'>
      <div className='header'>
        <p>{ header }</p>
      </div>
      <div className='rows'>
        { cells }
      </div>
    </div>
    )
}
