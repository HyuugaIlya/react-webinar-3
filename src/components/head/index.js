import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function Head({
  title,
  children
}) {

  const cn = bem('Head');

  return (
    <div className={cn(children && 'lang')}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

Head.defaultProps = {
  title: 'Магазин'
};

export default memo(Head);