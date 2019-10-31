const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    usertype: {
      type: Sequelize.STRING
    },
    interest_level: {
      type: Sequelize.INTEGER
    },
    exp_timeframe: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
)
