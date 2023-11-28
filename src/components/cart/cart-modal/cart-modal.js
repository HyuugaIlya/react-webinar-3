import React from "react";
import PropTypes from 'prop-types';
import CartList from "../cart-list";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CartModal({ cart, onRemove, isModal, setIsModal }) {
    if (cart.length === 0) {
        setIsModal(!isModal)
    }

    const cn = bem('Cart-modal');

    return (
        <div className='root'>
            <div className={cn()}>
                <div className={cn() + '_head'}>
                    <h1>Корзина</h1>
                    <button onClick={() => setIsModal(!isModal)}>Закрыть</button>
                </div>
                <div className={cn() + '_list'}>
                    <CartList
                        cart={cart}
                        onRemove={onRemove}
                    />
                </div>
            </div>
        </div >
    )
}

CartModal.propTypes = {
    isModal: PropTypes.bool
};

export default React.memo(CartModal);