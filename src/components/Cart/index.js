import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'
import './index.css'

class Cart extends Component {
  state = {cartData: [], isLoading: false}

  componentDidMount() {
    this.gettingCartData()
  }

  gettingCartData = () => {
    this.setState({isLoading: true})
    const cartData = localStorage.getItem('cartData')
    const cartList = JSON.parse(cartData)
    console.log(cartList)
    if (cartList !== null) {
      this.setState({cartData: [...cartList], isLoading: false})
    } else {
      this.setState({isLoading: false})
    }
  }

  onIncrementItem = Item => {
    const {cartData} = this.state
    const index = cartData.indexOf(Item)
    console.log(index)
    cartData[index] = {...Item, itemsInCart: Item.itemsInCart + 1}
    this.setState({cartData: [...cartData]})
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.gettingCartData()
  }

  onDecrementItem = Item => {
    if (Item.itemsInCart === 1) {
      const {cartData} = this.state
      const modifiedData = cartData.filter(each => each.id !== Item.id)
      this.setState({cartData: [...modifiedData]})
      localStorage.setItem('cartData', JSON.stringify(modifiedData))
      this.gettingCartData()
    } else {
      const {cartData} = this.state
      const index = cartData.indexOf(Item)
      console.log(index)
      cartData[index] = {...Item, itemsInCart: Item.itemsInCart - 1}
      this.setState({cartData: [...cartData]})
      localStorage.setItem('cartData', JSON.stringify(cartData))
      this.gettingCartData()
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  placeOrder = () => {
    const {history} = this.props
    localStorage.clear()
    history.replace('/order-successful')
  }

  cartItem = Item => {
    const {id, name, imageUrl, cost, itemsInCart} = Item

    return (
      <li className="cart-item" testid="cartItem" key={id}>
        <div className="img-name-container">
          <img src={imageUrl} alt="food item" className="item-image" />
        </div>
        <div className="item-details">
          <h1 className="item-name">{name}</h1>
          <Counter
            Item={Item}
            itemsInCart={itemsInCart}
            incrementItem={this.onIncrementItem}
            decrementItem={this.onDecrementItem}
            key={itemsInCart}
          />
          <div className="cost-container">
            <BiRupee className="price" />
            <p className="price">{cost}.00</p>
          </div>
        </div>
      </li>
    )
  }

  renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670841792/Mini%20Projects%20Library%20-%20tastyKitchensApp/cooking_1_fndifn.png"
        className="empty-cart-img"
        alt="empty cart"
      />
      <h1 className="page-heading">No Order Yet!</h1>
      <p className="page-description">
        Your cart is empty. Add something from the menu.
      </p>
      <button className="page-btn" type="button">
        <Link to="/" className="btn-link">
          Order now
        </Link>
      </button>
    </div>
  )

  render() {
    const {cartData, isLoading} = this.state

    const cartItemsView = totalPrice => (
      <>
        <div className="cart-body">
          <div className="columns-container">
            <p className="column">Item</p>
            <p className="column">Quantity</p>
            <p className="column">Price</p>
          </div>
          <ul className="cart-container">
            {cartData.map(Item => this.cartItem(Item))}
          </ul>
          <hr className="hr_line" />
          <div className="order-details-container">
            <h1 className="order-heading">Order Total:</h1>
            <div className="cost-container">
              <BiRupee className="total-price" />
              <p className="total-price" testid="total-price">
                {totalPrice}.00
              </p>
            </div>
          </div>
          <button
            className="place-order-btn"
            type="button"
            onClick={this.placeOrder}
          >
            Place Order
          </button>
        </div>
        <Footer />
      </>
    )

    const renderCartView = () => {
      if (cartData.length !== 0) {
        const initialValue = 0
        const totalPrice = cartData.reduce(
          (accumulator, each) => accumulator + each.itemsInCart * each.cost,
          initialValue,
        )
        console.log(totalPrice, 'total Price')
        return cartItemsView(totalPrice)
      }
      return this.renderEmptyCartView()
    }

    const result = localStorage.getItem('cartData')
    const Result = JSON.parse(result)
    console.log(`local data = ${Result}`)

    return (
      <div className="app-container">
        <Header />
        {isLoading ? this.renderLoader() : renderCartView()}
      </div>
    )
  }
}

export default Car
