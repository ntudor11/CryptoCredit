import React, {Component} from 'react'
import macbook from './../macbook.png'

class Landing extends Component {
  render() {
    return (
      <div className="container row container-front">
        <div className="col-md-6">
          <h1 id="logotext" className="">Crypto<span>Credit</span></h1>
          <h3>The P2P Lending Platform for Crypto-Assets</h3>
          <p>Let your crypto work for you. Currently with Ether, soon +30 other cryptocurrencies. Invest and earn competitive returns. Borrow without selling crypto assets.</p>
        </div>
        <div className="col-md-6 text-center">
          <img className="mx-auto d-block" src={macbook} alt="macbook" width='400'/>
        </div>
      </div>
    )
  }
}

export default Landing
