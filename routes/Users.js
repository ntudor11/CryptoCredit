const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const User = require("../models/User")
const Transaction = require("../models/Transaction")
users.use(cors())


process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  //const today = new Date()
  const userData = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    usertype: req.body.usertype,
    interest_level: req.body.interest_level,
    exp_timeframe: req.body.exp_timeframe
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        User.create(userData)
        .then(user => {
          res.json({status: user.email + ' registered'})
          console.log(user.email + ' registered')
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
    } else {
      res.json({error: "User already exists"})
      console.log(user.email + ' already exists')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

var loggeduser = users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
        return user
      }
    } else {
      res.status(400).json({error: 'User does not exist'})
      return null
    }
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
})

  // display logged user data in JSON
  users.get('/profile', function(req, res, next) {
    //here it is
    var user = req.user;
    //you probably also want to pass this to your view
    res.render('profile', { title: 'profile', user: user });
  });

// show JSON list of all users
  users.get('/userlist', function(req, res, next) {
    // res.locals.connection.query('select * from users', function (error, results, fields) {
    //     if(error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    User.findAll({
      attributes: ['id', 'email', 'usertype', 'interest_level', 'exp_timeframe']
    })
    .then(user => {
      res.send(JSON.stringify(user))
    }
  )}
);

  // show JSON list of all investors
  users.get('/investors', function(req, res, next) {
    // res.locals.connection.query('select * from users', function (error, results, fields) {
    //     if(error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    User.findAll({
      where: {'usertype': 'Investor'},
      attributes: ['id', 'email', 'usertype', 'interest_level', 'exp_timeframe']
    })
    .then(user => {
      res.send(JSON.stringify(user))
    }
  )}
);

  // show JSON list of all borrowers
  users.get('/borrowers', function(req, res, next) {
    // res.locals.connection.query('select * from users', function (error, results, fields) {
    //     if(error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    User.findAll({
      where: {'usertype': 'Borrower'},
      attributes: ['id', 'email', 'usertype', 'interest_level', 'exp_timeframe']
    })
    .then(user => {
      res.send(JSON.stringify(user))
    }
  )}
);
User.hasMany(Transaction, {foreignKey: 'id'})

module.exports = users
