import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onIncrementItem = () => {
    const {incrementItem, Item} = this.props
    incrementItem(Item)
  }

  onDecrementItem = () => {
    const {decrementItem, Item} = this.props
    decrementItem(Item)
  }

  render() {
    const {itemsInCart} = this.props
    return (
      <div className="item-count-container">
        <button
          type="button"
          className="count-btn"
          testid="decrement-quantity"
          onClick={this.onDecrementItem}
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
          onClick={this.onIncrementItem}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
