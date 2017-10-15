import React from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

const LoginButton = ({ onLoginUserClick }) => (
  <li className={ 'pure-menu-item' }>
    <a
      className= { 'pure-menu-link' }
      onClick={ (event) => preventDefaultHelper(event, onLoginUserClick) }
    >
      Login
    </a>
  </li>
);

LoginButton.propTypes = {
  onLoginUserClick: PropTypes.func.isRequired
};

export default LoginButton;
