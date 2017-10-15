import { connect } from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import { signUp as signUpActions } from '../actions';
import { selectWeb3InstanceFromState } from '../selectors/web3';

const mapStateToProps = state => ({
  web3: selectWeb3InstanceFromState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSignUpFormSubmit: (web3) => (name) => dispatch(
    signUpActions.signUpUser({
      web3,
      name
    })
  )
});

const mergedProps = ({ web3 }, { onSignUpFormSubmit }) => ({
  onSignUpFormSubmit: onSignUpFormSubmit(web3)
});

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(SignUpForm);

export default SignUpFormContainer;
