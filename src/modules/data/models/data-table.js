import { INTEGER, JSON, STRING } from 'sequelize'
import db from 'db'

const DataTable = db.define('data-table', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  code: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  createdBy: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  editedAt: {
    type: 'TIMESTAMP',
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  editedBy: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  attributes: JSON,
})

export default DataTable
