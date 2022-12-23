import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiResponsesList = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificRestaurant extends Component {
  state = {
    restaurantDetails: {},
    foodItemsList: [],
    apiResponseStatus: apiResponsesList.initial,
  }

  componentDidMount() {
    this.getRestaurantItemsDetailsList()
  }

  getRestaurantItemsDetailsList = async () => {
    this.setState({apiResponseStatus: apiResponsesList.inProgress})
    const cartData = localStorage.getItem('cartData')
    const cartList = JSON.parse(cartData)
    console.log(cartList)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const JwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const restaurantDetails = {
        id: data.id,
        imageUrl: data.image_url,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        itemsCount: data.items_count,
        foodItems: data.food_items,
      }
      const foodItemsList = restaurantDetails.foodItems.map(each => ({
        id: each.id,
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
        itemsInCart: 0,
      }))

      const checkItems = eachItem => {
        const filteredItem = cartList.filter(each => each.id === eachItem.id)
        if (filteredItem.length === 0) {
          return eachItem
        }
        return {...filteredItem[0]}
      }

      if (cartList === null) {
        this.setState({
          apiResponseStatus: apiResponsesList.success,
          restaurantDetails,
          foodItemsList,
        })
      } else {
        const modifiedList = foodItemsList.map(eachItem => checkItems(eachItem))
        this.setState({
          apiResponseStatus: apiResponsesList.success,
          restaurantDetails,
          foodItemsList: modifiedList,
        })
      }
    } else {
      this.setState({apiResponseStatus: apiResponsesList.failure})
    }
  }

  addItemToCart = Item => {
    const {foodItemsList} = this.state
    const List = [...foodItemsList]
    const modifiedItem = {...Item, itemsInCart: Item.itemsInCart + 1}
    const index = foodItemsList.indexOf(Item)
    List[index] = {...modifiedItem}
    this.setState({foodItemsList: List})
  }

  incrementItem = Item => {
    const {foodItemsList} = this.state
    const List = [...foodItemsList]
    const modifiedItem = {...Item, itemsInCart: Item.itemsInCart + 1}
    const index = foodItemsList.indexOf(Item)
    List[index] = {...modifiedItem}
    this.setState({foodItemsList: List})
  }

  decrementItem = Item => {
    const {foodItemsList} = this.state
    const List = [...foodItemsList]
    const modifiedItem = {...Item, itemsInCart: Item.itemsInCart - 1}
    const index = foodItemsList.indexOf(Item)
    List[index] = {...modifiedItem}
    this.setState({foodItemsList: List})
  }

  renderLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {restaurantDetails, foodItemsList, apiResponseStatus} = this.state

    const cartData = localStorage.getItem('cartData')
    console.log(`local: -${cartData}-`)

    if (cartData !== []) {
      const cartItems = foodItemsList.filter(each => each.itemsInCart > 0)
      if (cartItems.length > 0) {
        localStorage.setItem('cartData', JSON.stringify(cartItems))
      }
    }
    console.log(cartData)

    const {
      name,
      imageUrl,
      rating,
      costForTwo,
      cuisine,
      location,
      reviewsCount,
    } = restaurantDetails

    const renderRestaurantDetails = () => (
      <div className="Banner">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />
        <div className="Restaurant-details">
          <h1 className="Name">{name}</h1>
          <p className="type">{cuisine}</p>
          <p className="location">{location}</p>
          <div className="rating-cost-container">
            <div className="ratings-container">
              <div className="rating-items">
                <AiFillStar color="#ffffff" />
                <p className="Rating">{rating}</p>
              </div>
              <p className="Review">{reviewsCount}+ Ratings</p>
            </div>
            <hr className="hrLine" />
            <div className="ratings-container">
              <div className="rating-items">
                <BiRupee color="#ffffff" />
                <p className="Rating">{costForTwo}</p>
              </div>
              <p className="Review">Cost for Two</p>
            </div>
          </div>
        </div>
      </div>
    )

    const renderRestaurantItemsDetails = () => (
      <>
        {renderRestaurantDetails()}
        <ul className="food-items-list">
          {foodItemsList.map(item => (
            <FoodItem
              key={item.id}
              Item={item}
              addItemToCart={this.addItemToCart}
              incrementItem={this.incrementItem}
              decrementItem={this.decrementItem}
            />
          ))}
        </ul>
      </>
    )

    const renderResult = () => {
      switch (apiResponseStatus) {
        case apiResponsesList.inProgress:
          return this.renderLoader()
        case apiResponsesList.success:
          return renderRestaurantItemsDetails()
        default:
          return null
      }
    }

    return (
      <div className="app-container">
        <Header logout={this.onLogout} />
        {renderResult()}
        <Footer />
      </div>
    )
  }
}

export default SpecificRestaurant
