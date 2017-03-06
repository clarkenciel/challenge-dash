'use strict'

import React from 'react'

const headerStyle = {
  backgroundColor: '#cccccc',
  padding: '5px',
  display: 'box',
}

const buttonStyle = {
  height: '20px',
  margin: '0'
}

export default function ColumnHeader({ header, pinned, onClick }) {
  return (
    <div 
      className='header'
      style={ headerStyle }>
      <div>
        <h4 style={ { margin: '0' } }>{ header }</h4>
      </div>
      <div>
        <label
          style={ buttonStyle }
        >
          <input 
            type='checkbox'
            onChange={ onClick } 
            checked={ pinned ? 'checked' : '' }
          />
          (un)pin
        </label>
      </div>
    </div>
    )
}
