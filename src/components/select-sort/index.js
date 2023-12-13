import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function SelectSort(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select
      className="Select"
      value={props.value}
      onChange={onSelect}
    >
      {props.options.map(item => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.title}
        </option>
      ))}
    </select>
  )
}

SelectSort.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node
};

SelectSort.defaultProps = {
  onChange: () => {
  }
}

export default memo(SelectSort);
