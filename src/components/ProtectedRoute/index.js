import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    const {path, component} = props
    return <Route exact path={path} component={component} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
