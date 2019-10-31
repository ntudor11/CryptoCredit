import axios from 'axios'

export const register = newUser => {
  return axios
  .post('users/register', {
    email: newUser.email,
    password: newUser.password,
    usertype: newUser.usertype,
    interest_level: newUser.interest_level,
    exp_timeframe: newUser.exp_timeframe
  })
  .then(res => {
    console.log("Registered new user")
  })
}

export const login = user => {
  return axios
  .post('users/login', {
    email: user.email,
    password: user.password
  })
  .then(res => {
    localStorage.setItem('usertoken', res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}
