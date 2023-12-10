import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

import './style.css';

function NavigationLinks({
  clearArticle,
  linkHome
}) {

  const cn = bem('NavLinks');

  return (
    <section className={cn()}>
      <Link
        to={'/main'}
        onClick={clearArticle}
      >
        <span className={cn('link')}>{linkHome}</span>
      </Link>
    </section>
  );
};

NavigationLinks.propTypes = {
  linkHome: PropTypes.string,
  clearArticle: PropTypes.func
};

NavigationLinks.defaultProps = {
  clearArticle: () => { }
};

export default memo(NavigationLinks);