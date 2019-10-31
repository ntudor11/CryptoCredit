import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import User from '../user2.svg'
import Rating from '../rating.svg'
import AsideFilter from './AsideFilter'

class Marketplace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      usertype: '',
      interest_level: '',
      exp_timeframe: '',
      users: []
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
    }, () => {
      let self = this;
      if (this.state.usertype === 'Investor') {
        fetch('http://localhost:5000/users/borrowers', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
        console.log("is investor!");
      } else if (this.state.usertype === 'Borrower') {
        fetch('http://localhost:5000/users/investors', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
        console.log("is borrower");
      } else {
        fetch('http://localhost:5000/users/userlist', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
        console.log("somthing wrong, check state");
      }
    })
  }

  render() {

    const userBox = this.state.users.map(user =>
      <div className="user-box col-10">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-3">
                <img src={User} alt="user-icon"/>
              </div>
              <div className="col-9">
                <p><a href={"mailto:" + user.email}>{user.email}</a></p>
                <img src={Rating} alt="user-rating"/>
              </div>
            </div>
            <div className="row">
            <div className="col text-center">
                <p className="cta"><a href={"mailto:" + user.email}>Send Request</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col">
              <p>Requested amount: {Math.floor((Math.random() * 100) + 1)} ETH</p>
              <p>Interest level: {user.interest_level}</p>
              <p>Period: {user.exp_timeframe} months</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    )

    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <AsideFilter/>
          </div>
          <div className="col-md-8">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">MARKETPLACE</h1>
            </div>
            <div className="container">
              <div className="row">
                {userBox}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Marketplace
