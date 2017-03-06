'use strict'

import React from 'react'

import Errors from './Errors.jsx'
import Table from './Table.jsx'
import Loading from './Loading.jsx'

function getBody(loading, data, errors) {
  if (errors.size > 0) {
    return <Errors {...errors} />
  }
  else if (loading) {
    return <Loading />
  }
  else {
    return (
      <Table
        lockedColumns={ data.lockedColumns }
        freeColumns={ data.freeColumns }
        rows={ data.table.rows }
      />
      )
  }
}

export default function App({ loading, tableData, errors }) {
  return (
    <div>
      { getBody(loading, tableData, errors) }
    </div>
  )
}
