'use strict'

import React from 'react'
import { LockedColumnSection, ScrollableColumnSection } from './ColumnSections.jsx'

function processColumn(column, rows) {
  const header = column
  // debugger
  return {
    header,
    data: rows.map(r => r[column])
  }
}

const tableStyle = {
  minWidth: 500,
  display: 'flex',
  direction: 'row'
}

export default function Table({ lockedColumns, freeColumns, rows }) {
  const processor = col => processColumn(col, rows)
  return (
    <div id='data-table' 
      style={ tableStyle } >
      <LockedColumnSection columns={ lockedColumns.map(processor) } />
      <ScrollableColumnSection columns={ freeColumns.map(processor) } />
    </div>
  )
}
