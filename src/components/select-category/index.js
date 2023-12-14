import { memo } from "react";
import PropTypes from 'prop-types';

import './style.css';

function SelectCategory(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select
      className="Select"
      value={props.value}
      onChange={onSelect}
    >
      <option value=''>
        Все
      </option>
      {props.options.map(item => {
        return <option
          key={item._id}
          value={item._id}
        >
          {item.title}
        </option>
      })}
    </select>
  )
}

SelectCategory.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
      ]),
    }),
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

SelectCategory.defaultProps = {
  onChange: () => { }
}

export default memo(SelectCategory);