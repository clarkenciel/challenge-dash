'use strict'

import React from 'react'
import Column from './Column.jsx'
import * as CA from '../actions/ColumnActions.js'

function makeColumns(columns) {
  return columns.map((c, i) => 
    <Column key={i} {...c} />)
}

const fixedStyle = {
  display: 'flex',
  direction: 'row',
  borderRight: '2px solid',
  paddingLeft: '2px',
  paddingRight: '2px'
}

export function LockedColumnSection({ columns }) {
  const preppedCols = columns.toArray().map(c => {
    c.pinned = true
    c.pinToggle = () => CA.unpin(c.header)
    return c
  })
  const cols = makeColumns(preppedCols)
  return (
    <div 
      className='column-section locked'
      style={ fixedStyle }>
      { cols }
    </div>
  )
}

const scrollStyle = {
  display: 'flex',
  direction: 'row',
  paddingLeft: '2px',
  overflow: 'scroll'
}

export function ScrollableColumnSection({ columns }) {
  const preppedCols = columns.toArray().map(c => {
    c.pinned = false
    c.pinToggle = () => CA.pin(c.header)
    return c
  })
  const cols = makeColumns(preppedCols)
  return (
    <div 
      className='column-section'
      style={ scrollStyle } >
      { cols }
    </div>
  )
}
