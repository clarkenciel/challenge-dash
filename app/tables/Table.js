'use strict'

import { Set, List } from 'immutable'

const Table = Object.create(Joinable)

Table.toArray = function() { return this.rows.toArray() }

Table.columns = function() { return this.columns }

Table.fromArray = arr => {
  const nu = Object.create(Table)
  nu.rows = List(arr)
  nu.columns = arr.reduce(
    (s, r) => s.addKeys(r), 
    new Set()
  )
  return nu
}

Table.from = ({ column_names, columns, rows }) => {
  const nu = Object.create(Table)
  nu.rows = List(rows)
  nu.columns = new Set(column_names || columns)
  return nu
}

export default Table
