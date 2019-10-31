import React, {Component} from 'react'
import {register} from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      usertype: '',
      interest_level: '',
      exp_timeframe: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.usertype,
      interest_level: this.state.interest_level,
      exp_timeframe: this.state.exp_timeframe
    }

    register(user).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container-form">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Please Register.
              </h1>
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>
                <input type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>
                <input type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="usertype">
                  User Type (Investor / Borrower)
                </label>
                <input type="text"
                  className="form-control"
                  name="usertype"
                  placeholder="Investor / Borrower"
                  value={this.state.usertype}
                  onChange={this.onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="interest_level">
                  Interest Level (8%, 10% or 12%)
                </label>
                <input type="number"
                  min = "8" step = "2" max = "12"
                  className="form-control"
                  name="interest_level"
                  placeholder="8, 10 or 12"
                  value={this.state.interest_level}
                  onChange={this.onChange} />
              </div>

              <div className="form-group">
                <label htmlFor="exp_timeframe">
                  Expected Timeframe (between 3 months to 36 months)
                </label>
                <input type="number"
                  min = "3" step = "1" max = "36"
                  className="form-control"
                  name="exp_timeframe"
                  placeholder="3-36"
                  value={this.state.exp_timeframe}
                  onChange={this.onChange} />
              </div>

              <button type="submit"
                className="button btn btn-lg btn-primary btn-block"> Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
