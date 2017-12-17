import React from 'react'
import RequestHelper from '../helpers/requestHelper'


class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      me: "whoami not loaded" 
    }

    this.requestHelper = new RequestHelper()
  }

  render() {
    const data = this.state.me
    const jsontest = JSON.stringify(data, null, 2)

    return (
      <div>
        <p>Account access authorised</p>
        <pre>{jsontest}</pre>
        <a href={"/account"}>Go to account</a>
      </div>
      )

  }

  componentDidMount(){
    this.requestHelper.makeGetRequest("http://localhost/api/whoami", (results) => {
      this.setState({ me: { results }})
    } )
  }

}


export default AuthContainer