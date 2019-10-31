const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
  'transaction',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    investor_id: {
      type: Sequelize.INTEGER,
      references: 'users',
      referencesKey: 'id'
    },
    borrower_id: {
      type: Sequelize.INTEGER,
      references: 'users',
      referencesKey: 'id'
    },
    type: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.INTEGER
    },
    transaction_time: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
