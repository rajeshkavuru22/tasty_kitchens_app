import {Component} from 'react'
import Cookies from 'js-cookie'

export default class ProfileDetails extends Component {
  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const url = 'https://apis.ccbp.in/login'
    const JwtToken = Cookies.get('jwt_token')
    console.log(JwtToken)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
  }

  render() {
    return <h1>rfer</h1>
  }
}
