import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function List({ list, onAction }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func
};

List.defaultProps = {
  onAction: () => {

  }
};

export default React.memo(List);
