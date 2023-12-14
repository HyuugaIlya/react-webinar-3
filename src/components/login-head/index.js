import { memo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function LoginHead({
  onChange,
  name,
  isAuth,
  isFetching
}) {
  return <section className="Login">
    {isAuth && <Link
      to={'/profile'}
      className="Login-link"
    >
      <span>{name}</span>
    </Link>}
    <button
      disabled={isFetching}
      onClick={onChange}
    >
      {isAuth
        ? 'Выход'
        : 'Вход'}
    </button>
  </section>
}

LoginHead.propTypes = {
  name: PropTypes.string,
  isAuth: PropTypes.bool,
  isFetching: PropTypes.bool,
  onChange: PropTypes.func
}

LoginHead.defaultProps = {
  onChange: () => { }
}

export default memo(LoginHead);