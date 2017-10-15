import React from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

const LogoutButton = ({ onLogoutUserClick }) => (
  <li
    className={ 'pure-menu-item' }
  >
    <a
      className={ 'pure-menu-link' }
      onClick={ (e) => preventDefaultHelper(e, onLogoutUserClick) }
    >
      Logout
    </a>
  </li>
);

LogoutButton.propTypes = {
  onLogoutUserClick: PropTypes.func.isRequired
};

export default LogoutButton;
