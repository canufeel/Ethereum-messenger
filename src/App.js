import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js';

// UI Components
import LoginButtonContainer from './containers/LoginButtonContainer';
import LogoutButtonContainer from './containers/LogoutButtonContainer';

// Styles
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

const App = ({
  children
}) => {
  const OnlyAuthLinks = VisibleOnlyAuth(() =>
    (<span>
      <li className={ 'pure-menu-item' }>
        <Link
          to={ '/dashboard' }
          className={ 'pure-menu-link' }
        >
          Dashboard
        </Link>
      </li>
      <li className={ 'pure-menu-item' }>
        <Link
          to={ '/profile' }
          className={ 'pure-menu-link' }
        >
          Profile
        </Link>
      </li>
      <LogoutButtonContainer />
    </span>)
  );

  const OnlyGuestLinks = HiddenOnlyAuth(() =>
    (<span>
      <li className={ 'pure-menu-item' }>
        <Link
          to={ '/signup' }
          className={ 'pure-menu-link' }
        >
          Sign Up
        </Link>
      </li>
      <LoginButtonContainer />
    </span>)
  );

  return (
    <div className={ 'App' }>
      <nav className={ 'navbar pure-menu pure-menu-horizontal' }>
        <ul className={ 'pure-menu-list navbar-right' }>
          <OnlyGuestLinks />
          <OnlyAuthLinks />
        </ul>
        <Link
          to={ '/' }
          className={ 'pure-menu-heading pure-menu-link' }
        >Truffle Box</Link>
      </nav>

      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
