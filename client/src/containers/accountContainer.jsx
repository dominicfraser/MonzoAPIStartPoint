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
    // this.requestHelper.makeGetRequest("http://localhost/currentaccount", (results) => {
    //   console.log('got current account id')

    //   this.requestHelper.makeGetRequest("http://localhost/balance", (results) => {
    //     const balance = results.balance / 100
    //     this.setState({ balance: balance })

    //     this.requestHelper.makeGetRequest("http://localhost/transactions", (results) => {
    //       this.setState({ transactions: results.transactions })
    //     })
    //   })
    // })

//https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr#30008115
    this.requestHelper.makePromiseGetRequest("http://localhost/currentaccount")
      .then(() => {console.log('got current account id')})
      .then(() => { 
        return this.requestHelper.makePromiseGetRequest("http://localhost/balance")
      })
      .then((results) => {
        const balance = results.balance / 100
        this.setState({ balance: balance })
      })
      .then(() => {
        return this.requestHelper.makePromiseGetRequest("http://localhost/transactions")
      })
      .then((results) => {
        this.setState({ transactions: results.transactions })
      })
      .catch( err => console.log('err', err))
  }

}

export default AccountContainer