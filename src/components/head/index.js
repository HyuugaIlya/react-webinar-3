import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function Head({
  title,
  children
}) {
  const cn = bem('Head');

  return (
    <div className={cn(children && 'modal')}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default React.memo(Head);
