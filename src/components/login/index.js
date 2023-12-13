import { memo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function Login({ onChange, name, isAuth }) {
  return <section className="Login">
    {isAuth && <Link
      to={'/profile'}
      className="Login-link"
    >
      <span>{name}</span>
    </Link>}
    <button onClick={onChange}>
      {isAuth ? 'Выход' : 'Вход'}
    </button>
  </section>
}

Login.propTypes = {

}

Login.defaultProps = {

}

export default memo(Login);
