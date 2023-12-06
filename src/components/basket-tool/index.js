import { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import {
  numberFormat,
  plural
} from "../../utils";

import './style.css';

function BasketTool({
  sum,
  amount,
  onOpen,
  clearArticle
}) {

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link
        to={'/main'}
        onClick={clearArticle}
      >
        <span className={cn('link')}>Главная</span>
      </Link>
      <div>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${numberFormat(sum)} ₽`
            : `пусто`
          }
        </span>
        <button onClick={onOpen} disabled={!amount}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  clearArticle: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  clearArticle: () => { }
}

export default memo(BasketTool);