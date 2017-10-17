import React from 'react';
import PropTypes from 'prop-types';
import MessageFormContainer from '../containers/MessageFormContainer';

const Dashboard = ({ authData }) => (
  <main
    className={ 'container' }
  >
    <div
      className={ 'pure-g' }
    >
      <div
        className={ 'pure-u-1-1' }
      >
        <h1>Dashboard</h1>
        <p><strong>Hello {authData.name}!</strong></p>
        <MessageFormContainer />
      </div>
    </div>
  </main>
);

Dashboard.propTypes = {
  authData: PropTypes.object.isRequired
};

export default Dashboard;
