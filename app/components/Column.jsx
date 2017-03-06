'use strict'

import React from 'react'
import Cell from './Cell.jsx'
import ColumnHeader from './ColumnHeader.jsx'

const columnStyle = {
  borderRight: '1px solid black',
  borderLeft: '1px solid black',
}

const rowStyle = function(idx) {
  return {
    backgroundColor: idx % 2 === 0 ? 'white' : '#eeeeee',
    height: '20px',
    margin: '0',
    padding: '10px',
    minWidth: '150px'
  }
}

export default function Column({ pinned, pinToggle, header, data }) {
  const rows = data.map((d, k) =>  {
    return (
      <div 
        key={k}
        className='row'
        style={ rowStyle(k) } >
        <Cell data={ d } />
      </div>
      )
  })

  return (
    <div 
      className='column'
      style={ columnStyle }>
      <ColumnHeader 
        pinned={pinned}
        onClick={pinToggle}
        header={header} />
      <div 
        className='rows' > 
        { rows }
      </div>
    </div>
    )
}
