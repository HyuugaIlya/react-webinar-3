import React from "react";
import PropTypes from "prop-types";
// import { plural } from "../../utils";

function CartItem({ item, onRemove }) {
    const callbacks = {
        onRemove: (e) => {
            e.stopPropagation();
            onRemove(item.code)
        }
    }

    return (
        <div className={'Item'} >
            <div className='Item-code'>{item.code}</div>
            <div className='Item-title'>
                {item.title}
            </div>
            <div className='Item-price'>
                {item.price} &#8381;
            </div>
            <div className='Item-count'>
                {item.count} шт.
            </div>
            <div className='Item-actions'>
                <button onClick={callbacks.onRemove}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
};

CartItem.defaultProps = {

}

export default React.memo(CartItem);