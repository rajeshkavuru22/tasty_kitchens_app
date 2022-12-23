import {Link} from 'react-router-dom'
import {BsCheckCircleFill} from 'react-icons/bs'
import './index.css'

const PaymentSuccessful = () => {
  const paymentSuccess = () => (
    <>
      <BsCheckCircleFill className="successful" />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="page-description">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/" className="btn-link">
        <button className="page-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </>
  )

  return <div className="payment-container">{paymentSuccess()}</div>
}

export default PaymentSuccessful
