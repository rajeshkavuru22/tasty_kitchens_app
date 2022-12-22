import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import './index.css'

const tabItemsList = [
  {id: 'HOME', tabName: 'Home'},
  {id: 'CART', tabName: 'Cart'},
]

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const navbarTabButtons = () => (
    <>
      <ul className="tabs-list">
        <li className="tab-item" key={tabItemsList[0].id}>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="tab-item" key={tabItemsList[1].id}>
          <Link to="/cart" className="link">
            Cart
          </Link>
        </li>
      </ul>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  )

  const popupMenu = () => (
    <Popup
      modal
      position="right center"
      trigger={
        <button className="trans-btn" type="button">
          <GiHamburgerMenu className="icon" />
        </button>
      }
    >
      {close => (
        <div className="popup-tabs">
          {navbarTabButtons()}
          <button className="trans-btn" type="button" onClick={close}>
            <RiCloseCircleFill className="icon" />
          </button>
        </div>
      )}
    </Popup>
  )

  return (
    <nav className="navbar">
      <div className="website-logo-container">
        <Link to="/" className="link">
          <img
            src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670826217/Mini%20Projects%20Library%20-%20tastyKitchensApp/Vector_1_cuvuvw.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <h1 className="website-name">Tasty Kitchens</h1>
      </div>
      <div className="popup-hamburger-menu">{popupMenu()}</div>
      <div className="tools-container">{navbarTabButtons()}</div>
    </nav>
  )
}

export default Header
