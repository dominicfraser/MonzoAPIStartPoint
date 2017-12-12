import React from 'react'


class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      me: { one: "two" } 
    }
  }

  render() {
    const data = this.state.me
    const jsontest = JSON.stringify(data, null, 2)

    return (
      <div>
        <p>authorised</p>
        <pre>{jsontest}</pre>
      </div>
      )
    
  }

  componentDidMount(){
    this.makeGetRequest("http://localhost/whoami", (results) => {
      this.setState({ me: { results }})
    } )
  }

  makeGetRequest(url, callback){
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.addEventListener('load', function () {
      if (request.status !== 200) return
      const jsonString = request.responseText
      const resultsObject = JSON.parse(jsonString)
      callback(resultsObject)
    })
    request.send()
  }

}


export default AuthContainer