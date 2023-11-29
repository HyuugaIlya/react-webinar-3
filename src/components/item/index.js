import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function Item({ item, onAction }) {

  const cn = bem('Item');

  const actionFunc = useCallback(() => {
    if (item.count) {
      // if (window.confirm('Вы действительно хотите удалить этот товар из корзины?')) {
      onAction(item.code);
      // }
    } else {
      onAction(item);
    }
  }, [item]);

  return (
    <div className={cn()}>
      <div className={cn() + '__code'}>{item.code}</div>
      <div className={cn() + '__title'}>
        {item.title}
      </div>
      <div className={cn() + '__price'}>
        {item.price} &#8381;
      </div>
      {item.count && <div className={cn() + '__count'}>
        {item.count} шт.
      </div>}
      <div className={cn() + '__actions'}>
        <button onClick={actionFunc}>
          {item.count ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAction: PropTypes.func
};

Item.defaultProps = {
  onAction: () => {

  },
};

export default React.memo(Item);
