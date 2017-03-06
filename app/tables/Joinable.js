'use strict'

import { List } from 'immutable'
import Table from './Table.js'

const Joinable = Object.create(Table)
Joinable.join = function(table) {
  const j = Object.create(Join)
  j.tableOne = this
  j.tableTwo = table
  return j
}

const Join = Object.create(Joinable)
Join.on = function(column) {
  const joined = Object.create(this.tableOne)
  const newColumns = this.tableOne.columns.union(this.tableTwo.columns)

  joined.columns = newColumns

  joined.rows = this.tableOne.rows.map(r => {
    const key = r[column]
    const otherData = this.tableTwo.rows.find(r => r[column] === key)
    newColumns.forEach(c => {
      r[c] = r[c] ? r[c] : otherData[c]
    })
    return r
  })

  return joined
}

export default Joinable
