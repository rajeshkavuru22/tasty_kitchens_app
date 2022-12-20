import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import PaymentSuccessful from './components/PaymentSuccessful'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={SpecificRestaurant}
    />
    <ProtectedRoute
      exact
      path="/order-successful"
      component={PaymentSuccessful}
    />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
