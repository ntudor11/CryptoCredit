import React, { Component } from 'react';
import Script from "react-inline-script";
import {web3, Web3} from "web3";
import {Web3Provider, withWeb3 } from 'react-web3-provider';
import "./contractAbi";

class IndexWallet extends Component {

  componentDidMount() {

  }

  render() {

    const contractAddress = "0x131965482e25Ba221a92a2aFFA3e227A9f70C722";

    const getWeb = () => {
      if ( typeof web3 != 'undefined' ) {
        web3 = new Web3(web3.currentProvider);
        //$('#fromAddress').val('0xf17f52151EbEF6C7334FAD080c5704D77216b732');
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
        var version = web3.version;
        console.log("Using web3 version: " + version);
      }
    };

    const getBalance = (e) => {
      e.preventDefault();
      console.log("get balance works");
      web3.eth.getBalance(this.contractAddress, function(error, result) {
        if (error) {
          console.log('error: ' + error);
        } else {
          console.log('balance: ' + result);
        }
      })
    }

    return (
      <div>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <div className="theBodyWallet">
        {this.getWeb}
    <h2>Send money through smart contract:</h2>
    <form id="contract-form">
      <div className="form-group">
        <label htmlFor="Sender Address">Sender ETH Address</label>
        <input defaultValue="" type="text" className="form-control" id="fromAddress" aria-describedby="fromAddressHelp" placeholder="Enter your address" required={true}/>
        <small id="fromAddressHelp" className="form-text text-muted">Enter your wallet address. Note: you will need to approve this with your private key.</small>
      </div>
        <div className="form-group">
          <label htmlFor="Receiver Address">Receiver ETH Address</label>
          <input defaultValue="0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e" type="text" className="form-control" id="toAddress" aria-describedby="toAddressHelp" placeholder="Enter the receipient address" required={true}/>
          <small id="toAddressHelp" className="form-text text-muted">Enter the wallet address of the recipient.</small>
        </div>
          <div className="form-group">
            <label htmlFor="Amount">Amount</label>
            <input defaultValue="1" type="text" className="form-control" id="amount" aria-describedby="amountHelp" placeholder="Amount to send in ETH" required={true}/>
            <small id="amountHelp" className="form-text text-muted">How much you want to send in ETH.</small>
          </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <div id="deposit-result">Click the Submit button to deposit your ETH to the contract.</div>
    </form>
    <hr/>
    <h2>Balance:</h2>
    <form id="get-balance-form">
      <button type="submit" className="btn btn-primary" >Get Balance</button>
      <div id="the-balance">Click Button to get the current contract balance.</div>
    </form>
    <h2>Approver:</h2>
    <form id="approver-form">
      <button type="submit" className="btn btn-primary">Get Approver</button>
      <div id="approver-display">Click Button to get the address of the approver.</div>
    </form>

    <form id="approve-form">
      <button type="submit" className="btn btn-primary">Approve Transaction</button>
      <div id="approval-display">Click the button to approve the transaction.</div>
    </form>


    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>


    <Script>{`
      var contractAddress = "0x131965482e25Ba221a92a2aFFA3e227A9f70C722";
      if ( typeof web3 != 'undefined' ) {
        web3 = new Web3(web3.currentProvider);
        $('#fromAddress').val('0xf17f52151EbEF6C7334FAD080c5704D77216b732');
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
      }

      var version = web3.version;
      console.log("Using web3 version: " + version);



      var ApprovalContract = new web3.eth.Contract(abi,contractAddress);

      console.log(ApprovalContract);

      $('#contract-form').submit(function() {
        event.preventDefault();
        var fromAddress = $('#fromAddress').val();
        var toAddress = $('#toAddress').val();
        var amount = $('#amount').val();
        if (web3.utils.isAddress(fromAddress) != true) {
          alert('You did not enter a correct ethereum address for the sender address.');
          return;
        }
        if (web3.utils.isAddress(toAddress) != true) {
          alert('You did not enter a correct ethereum address for the recipient address.');
          return;
         }

        if (amount == 0){
          alert('You must send more than 0 ETH');
          return;
         }

      ApprovalContract.methods.deposit(toAddress).send({from: fromAddress, gas: 100000, value:  web3.utils.toWei(amount, 'ether')},
          function(error, result) {
            if (error) {
              console.log('error: ' + error);
              $('#deposit-result').html('<b>Error: </b>' + error);
            }
            else {
            $('#deposit-result').html('Success TX: <b>' + result + '</b>');
            }
          });
        });

    $('#get-balance-form').submit(function() {
      event.preventDefault();
      web3.eth.getBalance(contractAddress,
        function(error, result) {
          if (error) {
            console.log('error: ' + error);
          }
          else {
            console.log('balance: ' + result);
            $('#the-balance').html('<b>Current Balance: </b>' + web3.utils.fromWei(result));
          }
        });
      });

        $('#approve-form').submit(function() {
          event.preventDefault();

          ApprovalContract.methods.approve().call({from: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef', gas: 100000},
              function(error, result) {
                if (error) {
                  console.log('error: ' + error);
                }
                else {
                  console.log('result: ' + JSON.stringify(result));
                  $('#approval-display').html('Transaction Approved. TX: <b>' + result + '</b>');
                }
              });
        });
        $('#approver-form').submit(function() {
          event.preventDefault();

          ApprovalContract.methods.viewApprover().call(
              function(error, result) {
                if (error) {
                  console.log('error: ' + error);
                }
                else {
                  console.log('result: ' + JSON.stringify(result));
                  $('#approver-display').html('Approver Address: <b>' + result + '</b>');
                }
              });
        });`}
    </Script>
    </div>
</div>
    );
  }
}

export default IndexWallet;
