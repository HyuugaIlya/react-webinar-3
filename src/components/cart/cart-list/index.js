import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cart-item";
// import './style.css';

function CartList({ cart, onRemove }) {
  return (
    <div className='List'>{
      cart.map(item =>
        <div key={item.code} className='List-item'>
          <CartItem
            item={item}
            onRemove={onRemove}
          />
        </div>
      )}
      <div className="List-summ">
        <b>Итого:</b>
      </div>
    </div>
  )
}

CartList.propTypes = {
  CartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

CartList.defaultProps = {
  onDeleteItem: () => {
  },
  onSelectItem: () => {
  },
}

export default React.memo(CartList);