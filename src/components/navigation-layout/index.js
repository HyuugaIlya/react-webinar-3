import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function NavigationLayout({ children }) {

  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

NavigationLayout.propTypes = {
  children: PropTypes.node
};

export default memo(NavigationLayout);