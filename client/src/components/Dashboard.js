import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import Timestamp from 'react-timestamp'
import ChartTFunds from "../chart-total-funds.svg"
import ChartBorrowers from "../chart-borrowers.svg"
import ChartHistory from "../chart-history.svg"

class Dashboard extends Component {
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
    return (
      <div className="container">
        <div className="row main-kpis text-center">
          <div className="col-3">
            <p className="kpi-name">Total Funds</p>
            <h4 className="h4 kpi-val">132.4729 ETH</h4>
          </div>

          <div className="col-3">
            <p className="kpi-name">Lended Funds</p>
            <h4 className="h4 kpi-val">78.3841 ETH</h4>
          </div>

          <div className="col-3">
            <p className="kpi-name">Interest Level</p>
            <h4 className="h4 kpi-val">8%</h4>
          </div>

          <div className="col-3">
            <p className="kpi-name">Forecasted Balance (1y)</p>
            <h4 className="h4 kpi-val">154.2137 ETH</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 dash-left">
            <img className="chartImg" src={ChartTFunds} alt="chart1"/>
          </div>
          <div className="col-md-6 dash-right">
            <img className="chartImg" src={ChartBorrowers} alt="chart2"/>
          </div>
          <div className="col-md-6 dash-left">
            <img className="chartImg" src={ChartHistory} alt="chart3"/>
          </div>
          <div className="col-md-6 dash-right">

              <p style={{marginTop:"1em"}} className="font-weight-bold text-center">Latest Transactions</p>

              <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Investor ID</th>
                        <th>Borrower ID</th>
                        <th>Transaction Type</th>
                        <th>Value</th>
                        <th>Transaction Time</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.transactions.map(transaction =>
                    <tr key={transaction.id}>
                    <td>{transaction.investor_id} </td>
                    <td>{transaction.borrower_id}</td>
                    <td>{transaction.type} </td>
                    <td>{transaction.value} ETH</td>
                    <td><Timestamp date={transaction.transaction_time} /></td>
                    </tr>
                )}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
