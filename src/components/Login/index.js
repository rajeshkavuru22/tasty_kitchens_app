import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFormSuccess = JwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {
      expires: 1,
    })
    history.replace('/')
  }

  onSubmitFormFailure = errMsg => {
    this.setState({errorMsg: errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitFormSuccess(data.jwt_token)
    } else {
      this.onSubmitFormFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const formContainer = () => (
      <form className="form-container">
        <img
          src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670743980/Mini%20Projects%20Library%20-%20tastyKitchensApp/Rectangle_1457_x4gz96.png"
          alt="website dp"
          className="login-logo"
        />
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670826217/Mini%20Projects%20Library%20-%20tastyKitchensApp/Vector_1_cuvuvw.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-name">Tasty Kitchens</h1>
        </div>
        <div className="container">
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {errorMsg !== '' ? <p className="error-msg">{errorMsg}</p> : ''}
          <button
            className="login-btn"
            type="button"
            onClick={this.onSubmitForm}
          >
            Login
          </button>
        </div>
      </form>
    )

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <>
          <div className="Container">{formContainer()}</div>
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670827031/Mini%20Projects%20Library%20-%20tastyKitchensApp/Rectangle_1456_wyuzo7.png"
              alt="website login"
              className="food-img"
            />
          </div>
        </>
      </div>
    )
  }
}

export default Login
