const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("cryptocredit", "root", "root", {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    queueLimit : 0, // unlimited queueing
    connectionLimit : 0 // unlimited connections
  }
})

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

db.sequelize = sequelize
db.Sequelize = Sequelize

// sequelize.query('select id, email, usertype from users').then(function(rows) {
//     console.log(JSON.stringify(rows));
// });

module.exports = db
