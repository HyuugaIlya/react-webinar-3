import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import './style.css';

function CartHead({
  title,
  isModal,
  setIsModal
}) {
  const cn = bem('CartHead');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <button onClick={() => setIsModal(!isModal)}>Закрыть</button>
    </div>
  );
};

CartHead.propTypes = {
  title: PropTypes.string,
  isModal: PropTypes.bool,
  setIsModal: PropTypes.func
};

CartHead.defaultProps = {
  setIsModal: () => {

  }
};

export default React.memo(CartHead);
