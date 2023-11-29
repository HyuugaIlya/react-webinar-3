import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import List from "../../list";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function CartModal({
    cart,
    onRemove,
    isModal,
    setIsModal,
    totalPrice
}) {
    const cn = bem('CartModal');

    useEffect(() => {
        if (!cart.length) {
            setIsModal(!isModal)
        }
    }, [cart.length]);

    return (
        <div className='root'>
            <div className={cn()}>
                <div className={cn() + '__head'}>
                    <h1>Корзина</h1>
                    <button onClick={() => setIsModal(!isModal)}>Закрыть</button>
                </div>
                <div className={cn() + '__list'}>
                    <List
                        list={cart}
                        onAction={onRemove}
                    />
                    <div className={cn() + '__summ'}>
                        <b>Итого:</b>
                        <b>{totalPrice} ₽</b>
                    </div>
                </div>
            </div>
        </div >
    );
};

CartModal.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number
    })).isRequired,
    onRemove: PropTypes.func,
    totalCount: PropTypes.number,
    totalPrice: PropTypes.number,
    isModal: PropTypes.bool
};

CartModal.defaultProps = {
    onRemove: () => {

    }
};

export default React.memo(CartModal);