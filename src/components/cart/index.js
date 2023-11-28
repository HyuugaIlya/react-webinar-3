import React, { useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartModal from "./cart-modal/cart-modal";

import './style.css';

function Cart({ cart, onRemove, totalCount }) {
    const [isModal, setIsModal] = useState(false);

    const cn = bem('Cart');

    return (
        <div className={cn()}>
            {isModal && <CartModal
                cart={cart}
                onRemove={onRemove}
                isModal={isModal}
                setIsModal={setIsModal}
            />}
            <span className={cn('text')}>В корзине:</span>
            <b className={cn('text_b')}>{totalCount ? totalCount : 'пусто'}</b>
            <button disabled={!cart.length} onClick={() => setIsModal(!isModal)}>Перейти</button>
        </div>
    )
}

Cart.propTypes = {
    onAdd: PropTypes.func
};

Cart.defaultProps = {
    onAdd: () => { }
}

export default React.memo(Cart);