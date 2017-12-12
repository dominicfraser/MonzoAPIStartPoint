import React from 'react'


class LoginContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const client_id = "oauthclient_00009RQPsv5sYsKREbaUDp"
    const redirect_uri = "http://localhost/authorised"
    const state = "fajfljahiofosanlfo7878989fa9s6af76ga"

    return (
      <div><a href={"https://auth.getmondo.co.uk/?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=code&state=" + state}>Login to Monzo</a>
      </div>
      )
  }

}


export default LoginContainer