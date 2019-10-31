import React, {Component} from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import '../App.css'

class AsideFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investor_id: '',
      borrower_id: '',
      type: '',
      value: '',
      transaction_time: '',
      transactions: [],
      period: {min: 12, max: 18,},
      amount: {min:20, max: 50},
      interest: {min:8, max: 12},
      rating: {min:3, max:5}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return(
      <div className="col-md-12 aside">
        <div className="filter-container">
          <h4 className="nav-link">Sort by</h4>
          <select name="sortby">
            <option value="Period ASC">Period ASC</option>
            <option value="Period DESC">Period DESC</option>
            <option value="Date ASC">Date ASC</option>
            <option value="Date DESC">Date DESC</option>
            <option value="Amount ASC">Amount ASC</option>
            <option value="Amount DESC">Amount DESC</option>
            <option value="Interest ASC">Interest ASC</option>
            <option value="Interest DESC">Interest DESC</option>
          </select>
        </div>

        <h4 className="nav-link underline-from-center">Filter by </h4>
        <div className="filter-container">
          <p>Period (months)</p>
          <InputRange
            maxValue={36}
            minValue={3}
            formatLabel={value => `${value} m`}
            value={this.state.period}
            onChange={value => this.setState({ period: value })}
            onChangeComplete={value => console.log(value)} />
        </div>

        <div className="filter-container">
          <p>Amount</p>
          <InputRange
            maxValue={100}
            minValue={1}
            formatLabel={value => `${value} ETH`}
            value={this.state.amount}
            onChange={value => this.setState({ amount: value })}
            onChangeComplete={value => console.log(value)} />
        </div>

        <div className="filter-container">
          <p>Interest Rate</p>
          <InputRange
            maxValue={12}
            minValue={8}
            step={2}
            formatLabel={value => `${value} %`}
            value={this.state.interest}
            onChange={value => this.setState({ interest: value })}
            onChangeComplete={value => console.log(value)} />
        </div>

        <div className="filter-container">
          <p>User Rating</p>
          <InputRange
            maxValue={5}
            minValue={1}
            formatLabel={value => `${value} *`}
            value={this.state.rating}
            onChange={value => this.setState({ rating: value })}
            onChangeComplete={value => console.log(value)} />
        </div>
      </div>
    )
  }
}

export default AsideFilter
