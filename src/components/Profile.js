import React from 'react';
import ProfileFormContainer from '../containers/ProfileFormContainer';

const Profile = () => (
  <main className= { 'container' }>
    <div className={ 'pure-g' }>
      <div className={ 'pure-u-1-1' }>
        <h1>Profile</h1>
        <p>Edit your account details here.</p>
        <ProfileFormContainer />
      </div>
    </div>
  </main>
);

export default Profile;
