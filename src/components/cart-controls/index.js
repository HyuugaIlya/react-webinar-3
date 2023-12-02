import React from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function CartControls({
    cartLength,
    totalCount,
    totalPrice,
    isModal,
    setIsModal
}) {
    const cn = bem('CartControls');

    return (<div className={cn()}>
        <span className={cn() + '__text'}>В корзине:</span>
        <b className={cn() + '__text_b'}>{cartLength
            ? `${totalCount} ${plural(totalCount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров'
            })} / ${totalPrice} ₽`
            : 'пусто'}
        </b>
        <button
            className={cn() + '__button'}
            disabled={!cartLength}
            onClick={() => setIsModal(!isModal)}
        >
            Перейти
        </button>
    </div>);
};

CartControls.propTypes = {
    cartLength: PropTypes.number.isRequired,
    totalCount: PropTypes.number,
    totalPrice: PropTypes.number,
    isModal: PropTypes.bool,
    setIsModal: PropTypes.func
};

CartControls.defaultProps = {
    setIsModal: () => {

    }
};

export default React.memo(CartControls);