import { connect } from 'react-redux';
import LoginButton from '../components/LoginButton';
import { login as loginActions } from '../actions/index';
import { selectWeb3InstanceFromState } from '../selectors/web3';

const mapStateToProps = state => ({
  web3: selectWeb3InstanceFromState(state)
});

const mapDispatchToProps = dispatch => ({
  onLoginUserClick: web3 => (address) => dispatch(
    loginActions.loginUser({
      web3,
      address
    })
  )
});

const mergedProps = ({ web3 }, { onLoginUserClick }) => ({
  onLoginUserClick: onLoginUserClick(web3)
});

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(LoginButton);

export default LoginButtonContainer;

