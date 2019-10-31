import React, {Component} from 'react'
import {login} from './UserFunctions'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
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
      password: this.state.password
    }

    login(user).then(res => {
      if(res) {
        this.props.history.push(`/dashboard`)
      } else {
        console.log("Wrong credentials.")
        var errorLogin = "<p>Wrong credentials. Please check for errors.</p>"
        var errorPlaceholder = document.getElementById('error-placeholder');
        errorPlaceholder.innerHTML += errorLogin;
      }
    })
  }

  render() {
    return (
      <div className="container-form">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Please Log In.
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

              <button type="submit"
                className="button btn btn-lg btn-primary btn-block"> Log In
              </button>
            </form>
            <div id="error-placeholder">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
