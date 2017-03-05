'use strict'

import React from 'react'
import { LockedColumnSection, ScrollableColumnSection } from './ColumnSections.jsx'

export default function Table({ lockedColumns, unlockedColumns }) {
  return (
    <div id='data-table' style={ 'min-width': 500 } >
      <LockedColumnSection columns={ lockedColumns } />
      <ScrollableColumnSection columns={ unlockedColumns } />
    </div>
  )
}
