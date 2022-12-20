import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const FoodItem = props => {
  const {Item, addItemToCart, incrementItem, decrementItem} = props
  const {id, imageUrl, cost, name, rating, itemsInCart} = Item

  const AddItemToCart = () => {
    addItemToCart(Item)
  }

  const IncrementItem = () => {
    incrementItem(Item)
  }

  const DecrementItem = () => {
    decrementItem(Item)
  }

  const addButton = () => (
    <button className="add-btn" type="button" onClick={AddItemToCart}>
      ADD
    </button>
  )

  const addedItemButton = () => (
    <div className="items-count-container" testid="item-quantity">
      <button
        type="button"
        className="count-btn"
        testid="decrement-count"
        onClick={DecrementItem}
      >
        -
      </button>
      <p className="pages" testid="active-count">
        {itemsInCart}
      </p>
      <button
        type="button"
        className="count-btn"
        testid="increment-count"
        onClick={IncrementItem}
      >
        +
      </button>
    </div>
  )

  return (
    <li className="food-item" testid="foodItem" key={id}>
      <img src={imageUrl} alt="food item" className="food-image" />
      <div className="restaurant-details">
        <h1 className="name">{name}</h1>
        <div className="rating-items">
          <BiRupee className="cost" />
          <p className="cost">{cost}</p>
        </div>
        <div className="rating-container">
          <AiFillStar color="#F6BE00" />
          <p className="rating">{rating}</p>
        </div>
        {itemsInCart === 0 ? addButton() : addedItemButton()}
      </div>
    </li>
  )
}

export default FoodItem
