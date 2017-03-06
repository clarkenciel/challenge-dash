'use strict'

import React from 'react'

const cellStyle = {
  margin: '0',
  padding: '20px'
}

const cellPStyle = {
  margin: '0',
}

export default function Cell({ data }) {
  return (
    <div className='data-cell'>
      <p style={ cellPStyle }>{ data }</p>
    </div>
  )
}
