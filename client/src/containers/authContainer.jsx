import React from 'react'
import RequestHelper from '../helpers/requestHelper'


class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      me: { one: "two" } 
    }

    this.requestHelper = new RequestHelper()
  }

  render() {
    const data = this.state.me
    const jsontest = JSON.stringify(data, null, 2)

    return (
      <div>
        <p>account access authorised</p>
        <pre>{jsontest}</pre>
      </div>
      )

  }

  componentDidMount(){
    this.requestHelper.makeGetRequest("http://localhost/whoami", (results) => {
      this.setState({ me: { results }})
    } )
  }

}


export default AuthContainer