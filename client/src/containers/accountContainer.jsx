import React from 'react'
import RequestHelper from '../helpers/requestHelper'

class AccountContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      balance: "balance not retrieved"
    }

    this.requestHelper = new RequestHelper()
    this.getBalanceClick = this.getBalanceClick.bind(this)
  }

  render() {
    let balanceDisplay = <p></p>

    if(this.state.balance != "balance not retrieved"){
      balanceDisplay = <p>Balance: {this.state.balance}</p>
    }
  
    return(
      <div>
      <h1>Account</h1>
      <button onClick={this.getBalanceClick}>Get Current Account Balance</button>
      {balanceDisplay}
      </div>
      )
  }

  componentDidMount(){
    this.requestHelper.makeGetRequest("http://localhost/currentaccount", (results) => {
      console.log('got current account id')
    })
  }

  getBalanceClick(){
    this.requestHelper.makeGetRequest("http://localhost/balance", (results) => {
      const balance = results.balance / 100
      this.setState({ balance: balance })
      console.log(this.state.balance)
    })
  }

}

export default AccountContainer