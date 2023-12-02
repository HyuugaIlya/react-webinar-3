import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";

import './style.css';

function CartSumm({ totalPrice }) {
    const cn = bem('CartSumm');

    return (
        <div className={cn()}>
            <b>Итого:</b>
            <b>{totalPrice} ₽</b>
        </div>
    );
};

CartSumm.propTypes = {
    totalPrice: PropTypes.number,
};

export default React.memo(CartSumm);