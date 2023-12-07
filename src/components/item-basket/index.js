import { memo } from 'react';
import propTypes from 'prop-types';
import {
  numberFormat,
  plural
} from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: () => props.onClose()
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link
          to={`/article/${props.item._id}`}
          onClick={callbacks.onClose}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.price,
            props.lang === 'ru' ? 'ru-RU' : 'en-EN')} {props.lang === 'ru' ? '₽' : '$'}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0,
            props.lang === 'ru' ? 'ru-RU' : 'en-EN')} {props.lang === 'ru'
              ? 'шт.'
              : plural(props.item.amount, { one: 'piece', other: 'pcs' }, 'en-EN')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.buttonRemove}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onClose: propTypes.func,
  onRemove: propTypes.func,
  lang: PropTypes.string,
  buttonRemove: PropTypes.string,
}

ItemBasket.defaultProps = {
  onClose: () => { },
  onRemove: () => { },
}

export default memo(ItemBasket);
