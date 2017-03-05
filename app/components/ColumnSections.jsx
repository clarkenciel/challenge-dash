'use strict'

import React from 'react'
import Column from './Column.jsx'

function makeColumns(columns) {
  return columns.map((c, i) => <Column key={i} {...c} />
}

export function LockedColumnSection({ columns }) {
  const cols = makeColumns(columns)
  return (
    <div className='column-section locked'>
      { cols }
    </div>
  )
}

export function ScrollableColumnSection({ columns }) {
  const cols = makeColumns(columns)
  return (
    <div className='column-section'>
      { cols }
    </div>
  )
}
