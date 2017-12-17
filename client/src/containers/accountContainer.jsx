import React from 'react'
import RequestHelper from '../helpers/requestHelper'

class AccountContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      balance: "balance not retrieved",
      transactions: "transactions not retrieved"
    }

    this.requestHelper = new RequestHelper()
  }

  render() {
    let balanceDisplay = <p>Balance: {this.state.balance}</p>
    let transactionsDisplay = JSON.stringify(this.state.transactions, null, 2)
  
    return(
      <div>
      <h1>Account</h1>
      {balanceDisplay}
      <pre>{transactionsDisplay}</pre>
      </div>
      )
  }

  componentDidMount(){
//https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr#30008115
//TODO replace with fetch

    this.requestHelper.makePromiseGetRequest("http://localhost/api/currentaccount")
      .then(() => {console.log('got current account id')})
      .then(() => { 
        return this.requestHelper.makePromiseGetRequest("http://localhost/api/balance")
      })
      .then((results) => {
        const balance = results.balance / 100
        this.setState({ balance: balance })
      })
      .then(() => {
        return this.requestHelper.makePromiseGetRequest("http://localhost/api/transactions")
      })
      .then( results => {
        this.setState({ transactions: results.transactions })
      })
      .catch( err => console.log('err', err))
  }

}

export default AccountContainer