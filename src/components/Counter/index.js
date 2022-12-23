import './index.css'

const Counter = props => {
  const {incrementItem, decrementItem, itemsInCart, Item} = props

  const onIncrementItem = () => {
    incrementItem(Item)
  }

  const onDecrementItem = () => {
    decrementItem(Item)
  }
  return (
    <div className="item-count-container">
      <button
        type="button"
        className="count-btn"
        testid="decrement-quantity"
        onClick={onDecrementItem}
      >
        -
      </button>
      <p className="pages" testid="item-quantity">
        {itemsInCart}
      </p>
      <button
        type="button"
        className="count-btn"
        testid="increment-quantity"
        onClick={onIncrementItem}
      >
        +
      </button>
    </div>
  )
}

export default Counter
