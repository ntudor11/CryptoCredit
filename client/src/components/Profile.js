import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      usertype: '',
      interest_level: '',
      exp_timeframe: ''
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      email: decoded.email,
      usertype: decoded.usertype,
      interest_level: decoded.interest_level,
      exp_timeframe: decoded.exp_timeframe
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>

          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Email Address</td>
                <td><a href={"mailto:" + this.state.email}>{this.state.email}</a></td>
              </tr>

              <tr>
                <td>User Type</td>
                <td>{this.state.usertype}</td>
              </tr>

              <tr>
                <td>Interest Level</td>
                <td>{this.state.interest_level}</td>
              </tr>

              <tr>
                <td>Expected Timeframe</td>
                <td>{this.state.exp_timeframe}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile
