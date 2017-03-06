'use strict'

import { Set, List } from 'immutable'

const Table = {
  toArray() { return this.rows.toArray() },
  columns() { return this.columns },

  fromArray(arr) {
    const t = Table
    const nu = Object.create(this)
    nu.rows = List(arr)
    nu.columns = arr.reduce(
      (s, r) => s.union(Set(Object.keys(r))), 
      Set([])
    )
    return nu
  },

  from({ column_names, columns, rows }) {
    const nu = Object.create(this)
    nu.rows = List(rows)
    nu.columns = new Set(column_names || columns)
    return nu
  }
}

export default Table
