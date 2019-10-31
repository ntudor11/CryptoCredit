import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import IndexWallet from '../web/IndexWallet'

class Wallet extends Component {
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
          <IndexWallet/>
        </div>
      </div>
    )
  }
}

export default Wallet
