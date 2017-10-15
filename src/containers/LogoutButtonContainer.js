import { connect } from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import { logout as logoutActions } from '../actions';

const mapStateToProps = () => ({});

const LogoutButtonContainer = connect(
  mapStateToProps,
  {
    onLogoutUserClick: logoutActions.logoutUser
  }
)(LogoutButton);

export default LogoutButtonContainer;
