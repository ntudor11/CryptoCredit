import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import Timestamp from 'react-timestamp'
import Switch from "react-switch"
import User from '../user2.svg'
import Rating from '../rating.svg'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react'
import arrow from '../from-to.svg'
import AsideFilter from './AsideFilter'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investor_id: '',
      borrower_id: '',
      type: '',
      value: '',
      transaction_time: '',
      transactions: [],
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id: decoded.id,
      investor_id: decoded.investor_id,
      borrower_id: decoded.borrower_id,
      type: decoded.type,
      value: decoded.value,
      transaction_time: decoded.transaction_time
    }, () => {
      let self = this;
      fetch('http://localhost:5000/transactions/my_transactions', {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({transactions: data});
      }).catch(err => {
      console.log('caught it!',err);
      })
      console.log("should work");
    })
  }

  render() {
    const transaction = this.state.transactions.map(transaction =>
        <TimelineItem
          key={transaction.id}
          dateText={<Timestamp date={transaction.transaction_time} />}
          dateInnerStyle={{ background: '#4277A9', color: '#fff', fontSize: '10pt'}}
          style={{ color: '#e86971' }}>
          <div className="container container-timeline" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', backgroundColor: '#ffffff', padding:'1em'}}>
            <p className="p text-center">{transaction.type}</p>
            <div className="row">
              <div className="col-sm" style={{}}>
                {transaction.type === "Instalment" || transaction.type === "Interest" ? <p>From ID: {transaction.borrower_id}</p> : <p>From ID: {transaction.investor_id === 1 ?
                    <span>{transaction.investor_id} (me)</span> :
                    <span>{transaction.investor_id}</span>}
                </p>}

              </div>

              <div className="col-sm text-center" style={{}}>
                <p style={{fontSize: '8pt', marginBottom:'0px'}}>Amount: {transaction.value} ETH</p>
                <img alt="arrow" src={arrow} className="transaction-arrow"/>
              </div>

              <div className="col-sm" style={{}}>
                {transaction.type === "Instalment" || transaction.type === "Interest" ? <p>To ID: {transaction.investor_id}</p> :
                <p>To ID: {transaction.borrower_id}</p>}
              </div>
            </div>
          </div>
        </TimelineItem>
    )

    const userTransaction = this.state.transactions
    //.filter(transactions => this.state.transactions.borrower_id === 4)
    .map(transaction =>
      <div className="usertransaction col-12">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-3">
                <img src={User} alt="username"/>
              </div>
              <div className="col-9">
                <p className="userId">User ID: {transaction.borrower_id}</p>
                <img src={Rating} alt="user-rating"/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <p>Loan amount: {transaction.value}</p>
            <p>Transaction Started: <Timestamp date={transaction.transaction_time} /></p>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-10">
            <ProgressBar percent={Math.floor((Math.random() * 100) + 1)}>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                  >
                    {index + 1}
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                  >
                    {index + 1}
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                  >
                    {index + 1}
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                  >
                    {index + 1}
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>
        </div>
      </div>
    )

    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
          <label>
          Timeline <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          /> Status
          </label>
            <AsideFilter/>
          </div>
          <div className="col-md-8">
            <div className="mt-5">
              <div className="col-sm-8 mx-auto">
                <h1 className="text-center">Transactions</h1>
              </div>
              <div className="switch-type">
                {this.state.checked ?
                  <div>
                    {userTransaction}
                  </div>
                   :
                   <Timeline lineColor={'#ffffff'}>
                     {transaction}
                   </Timeline>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Transactions
