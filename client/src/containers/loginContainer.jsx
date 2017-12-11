import React from 'react'


class LoginContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {

    return (
      <div><a href={"https://auth.getmondo.co.uk/?client_id=oauthclient_00009RQPsv5sYsKREbaUDp&redirect_uri=http://localhost/authorised&response_type=code&state=fajfljahiofosanlfo7878989fa9s6af76ga"}>Login to Monzo</a>
      </div>
      )
  }

}



export default LoginContainer
