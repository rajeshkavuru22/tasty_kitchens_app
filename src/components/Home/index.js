import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdSort} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiResponsesList = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersList: [],
    restaurantsList: [],
    offersApiResponseStatus: apiResponsesList.initial,
    restaurantsApiResponseStatus: apiResponsesList.initial,
    sortByValue: sortByOptions[1].value,
    activePage: 1,
    searchText: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getOffersData()
    this.getRestaurantsData()
  }

  getOffersData = async () => {
    this.setState({offersApiResponseStatus: apiResponsesList.inProgress})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
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
      const offersList = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        offersApiResponseStatus: apiResponsesList.success,
        offersList,
      })
    } else {
      this.setState({
        offersApiResponseStatus: apiResponsesList.failure,
      })
    }
  }

  getRestaurantsData = async () => {
    this.setState({restaurantsApiResponseStatus: apiResponsesList.inProgress})
    const {activePage, sortByValue, searchInput} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${sortByValue}`
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
      console.log(data, activePage, searchInput, offset)
      const restaurantsList = data.restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        costForTwo: each.cost_fro_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        location: each.location,
        isDeliveringNow: each.is_delivering_now,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsApiResponseStatus: apiResponsesList.success,
        restaurantsList,
      })
    } else {
      this.setState({
        restaurantsApiResponseStatus: apiResponsesList.failure,
        sortByValue,
      })
    }
  }

  restaurantItem = item => {
    const {id, imageUrl, name, userRating, cuisine} = item
    const {rating, ratingColor, totalReviews} = userRating
    return (
      <Link to={`/restaurant/${id}`} className="link" key={id}>
        <li className="restaurant-Item" testid="restaurant-item" key={id}>
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <div className="restaurant-details">
            <h1 className="name">{name}</h1>
            <p className="text">{cuisine}</p>
            <div className="rating-container">
              <AiFillStar color={ratingColor} />
              <p className="rating">{rating}</p>
              <h1 className="review">({totalReviews} ratings)</h1>
            </div>
          </div>
        </li>
      </Link>
    )
  }

  renderOffersLoader = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsLoader = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  onClickLeftPagination = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
          searchInput: '',
          searchText: '',
        }),
        this.getRestaurantsData,
      )
    }
  }

  onClickRightPagination = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
          searchInput: '',
          searchText: '',
        }),
        this.getRestaurantsData,
      )
    }
  }

  changeOption = event => {
    this.setState({sortByValue: event.target.value}, this.getRestaurantsData)
  }

  onChangeText = event => {
    this.setState({searchText: event.target.value})
  }

  Search = () => {
    const {searchText} = this.state
    this.setState({searchInput: searchText}, this.getRestaurantsData)
  }

  render() {
    const {
      offersList,
      restaurantsList,
      offersApiResponseStatus,
      restaurantsApiResponseStatus,
      activePage,
      sortByValue,
      searchText,
    } = this.state
    console.log(restaurantsList)

    const offersSlider = () => {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
      return (
        <Slider {...settings} className="slider-container">
          {offersList.map(each => (
            <li className="image-container" key={each.id}>
              <img src={each.imageUrl} alt="offer" className="offer-image" />
            </li>
          ))}
        </Slider>
      )
    }

    const renderNoRestaurantsView = () => (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no restaurants"
          className="image"
        />
        <h1 className="heading">No Search results found</h1>
        <p className="Description">
          Try different key words or remove search filter
        </p>
      </div>
    )

    const renderOffersResult = () => {
      switch (offersApiResponseStatus) {
        case apiResponsesList.inProgress:
          return this.renderOffersLoader()
        case apiResponsesList.success:
          return offersSlider()
        default:
          return null
      }
    }

    const searchBar = () => (
      <div className="search-container">
        <input
          className="search"
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={this.onChangeText}
        />
        <button
          className="btn"
          type="button"
          testid="searchButton"
          onClick={this.Search}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )

    const paginationButtons = () => (
      <div className="page-number-container">
        <button
          type="button"
          className="pagination-btn"
          testid="pagination-left-button"
          onClick={this.onClickLeftPagination}
        >
          <img
            src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670917130/Mini%20Projects%20Library%20-%20tastyKitchensApp/Icon_xhj9w6.jpg"
            alt="pagination"
            className="pagination"
          />
        </button>
        <p className="Page">
          <span testid="active-page-number">{activePage}</span> of 4
        </p>
        <button
          type="button"
          className="pagination-btn"
          testid="pagination-right-button"
          onClick={this.onClickRightPagination}
        >
          <img
            src="https://res.cloudinary.com/dh8afj2yd/image/upload/v1670917055/Mini%20Projects%20Library%20-%20tastyKitchensApp/Icon_gxpzyi.png"
            alt="pagination"
            className="pagination"
          />
        </button>
      </div>
    )

    const renderRestaurantsDetails = (
      <div className="details-container">
        <h1 className="main-heading">Popular Restaurants</h1>
        <div className="sortby-details-container">
          <p className="sort-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-container">
            <MdSort className="sort-icon" />
            <p className="sort-head">Sort By</p>
            <select
              className="select"
              value={sortByValue}
              onChange={this.changeOption}
            >
              <option key={sortByOptions[0].id} value={sortByOptions[0].value}>
                {sortByOptions[0].displayText}
              </option>
              <option
                key={sortByOptions[1].id}
                defaultValue
                value={sortByOptions[1].value}
              >
                {sortByOptions[1].displayText}
              </option>
            </select>
          </div>
        </div>
        <hr className="hr-line" />
        {searchBar()}
        <ul className="restaurants-list-container">
          {restaurantsList.map(item => this.restaurantItem(item))}
        </ul>
        {paginationButtons()}
      </div>
    )

    const renderFailureView = () => (
      <div className="details-container">
        {searchBar()}
        {renderNoRestaurantsView()}
      </div>
    )

    const renderRestaurantResult = () => {
      switch (restaurantsApiResponseStatus) {
        case apiResponsesList.inProgress:
          return this.renderRestaurantsLoader()
        case apiResponsesList.success:
          return renderRestaurantsDetails
        case apiResponsesList.failure:
          return renderFailureView()
        default:
          return null
      }
    }

    const renderResult = () => (
      <div className="body-container">
        <div className="offers-container">{renderOffersResult()}</div>
        <div className="restaurants-details-container">
          {renderRestaurantResult()}
        </div>
      </div>
    )

    return (
      <div className="app-container">
        <Header />
        {renderResult()}
        <Footer />
      </div>
    )
  }
}

export default Home
