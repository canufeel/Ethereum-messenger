import React from 'react';
import SignUpFormContainer from '../containers/SignUpFormContainer';

const SignUp = () => (
  <main className={ 'container' }>
    <div className={ 'pure-g' }>
      <div className={ 'pure-u-1-1' }>
        <h1>Sign Up</h1>
        <p>We've got your wallet information, simply input your name and your account is made!</p>
        <SignUpFormContainer />
      </div>
    </div>
  </main>
);

export default SignUp;
