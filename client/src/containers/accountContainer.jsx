import React from 'react'
import RequestHelper from '../helpers/requestHelper'

class AccountContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      balance: "balance not retrieved"
    }

    this.requestHelper = new RequestHelper()
  }

  render() {
    let balanceDisplay = <p>Balance: {this.state.balance}</p>
  
    return(
      <div>
      <h1>Account</h1>
      {balanceDisplay}
      </div>
      )
  }

  componentDidMount(){
    this.requestHelper.makeGetRequest("http://localhost/currentaccount", (results) => {
      console.log('got current account id')
      this.requestHelper.makeGetRequest("http://localhost/balance", (results) => {
        const balance = results.balance / 100
        this.setState({ balance: balance })
        console.log(this.state.balance)
      })
    })
  }

}

export default AccountContainer