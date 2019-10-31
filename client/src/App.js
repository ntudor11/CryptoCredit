import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Marketplace from './components/Marketplace'
import Transactions from './components/Transactions'
import Wallet from './components/Wallet'
import Dashboard from './components/Dashboard'
import NoMatch from './components/NotFound'
// import logo from './logo-cc  .svg';
import './App.css';
import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';

// const NoMatch = ({ location }) => (
//   <div>
//     <h3>No match for <code>{location.pathname}</code></h3>
//   </div>
// )

class App extends Component {
  render() {
    return (
      <Web3Provider
        defaultProvider={(cb) => cb(new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/YOUR_API_KEY")))}
        loading="Loading..."
        error={(err) => `Connection error: ${err.message}`}
    >
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/marketplace" component={Marketplace}/>
              <Route exact path="/transactions" component={Transactions}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/wallet" component={Wallet}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
      </Web3Provider>
    );
  }
}

export default App;
