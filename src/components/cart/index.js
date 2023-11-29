import React, { useState } from "react";
import PropTypes from 'prop-types';
import CartModal from "./cart-modal";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function Cart({
    cart,
    onRemove,
    totalCount,
    totalPrice
}) {
    const [isModal, setIsModal] = useState(false);

    const cn = bem('Cart');

    return (
        <div className={cn()}>
            {isModal && <CartModal
                cart={cart}
                totalPrice={totalPrice}
                onRemove={onRemove}
                isModal={isModal}
                setIsModal={setIsModal}
            />}
            <span className={cn() + '__text'}>В корзине:</span>
            <b className={cn() + '__text_b'}>{cart.length
                ? `${totalCount} ${plural(totalCount, {
                    one: 'товар',
                    few: 'товара',
                    many: 'товаров'
                })} / ${totalPrice} ₽`
                : 'пусто'}
            </b>
            <button
                disabled={!cart.length}
                onClick={() => setIsModal(!isModal)}
            >
                Перейти
            </button>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number
    })).isRequired,
    onRemove: PropTypes.func,
    totalCount: PropTypes.number,
    totalPrice: PropTypes.number
};

Cart.defaultProps = {
    onRemove: () => {

    }
};

export default React.memo(Cart);