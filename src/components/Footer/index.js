import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <nav className="footer">
      <div className="website-logo-container">
        <img
          src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670831882/Mini%20Projects%20Library%20-%20tastyKitchensApp/Vector_2_yseyoc.png"
          alt="website-footer-logo"
          className="website-logo"
        />
        <h1 className="Name">Tasty Kitchens</h1>
      </div>
      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="contact-us-container">
        <FaPinterestSquare
          className="contact-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="contact-icon" testid="instagram-social-icon" />
        <FaTwitter className="contact-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="contact-icon"
          testid="facebook-social-icon"
        />
      </div>
    </nav>
  )
}
