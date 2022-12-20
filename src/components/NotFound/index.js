import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670839454/Mini%20Projects%20Library%20-%20tastyKitchensApp/erroring_1_ci2mcx.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="page-heading">Page Not Found</h1>
    <p className="page-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="btn-link">
      <button className="page-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
