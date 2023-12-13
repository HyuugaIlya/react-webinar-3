import { memo } from "react";
import PropTypes from 'prop-types';

import './style.css';

function Profile({ user }) {
  return <section className="Profile">
    <h1>Профиль</h1>
    <span>Имя: <b>{user?.profile?.name}</b></span>
    <span>Телефон: <b>{user?.profile?.phone}</b></span>
    <span>email: <b>{user?.email}</b></span>
  </section>
}

Profile.propTypes = {

}

Profile.defaultProps = {

}

export default memo(Profile);