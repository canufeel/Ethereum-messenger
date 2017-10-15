import { connect } from 'react-redux';
import ProfileForm from '../components/ProfileForm';

import { selectNameFromState } from '../selectors/name';
import { profile as profileActions } from '../actions';
import {selectWeb3InstanceFromState} from '../selectors/web3';

const mapStateToProps = state => ({
  name: selectNameFromState(state),
  web3: selectWeb3InstanceFromState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onProfileFormSubmit: web3 => name => dispatch(
    profileActions.updateUser({
      name,
      web3
    })
  )
});

const mergedProps = ({ web3, name }, { onProfileFormSubmit }) => ({
  onProfileFormSubmit: onProfileFormSubmit(web3),
  name
});

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(ProfileForm);

export default ProfileFormContainer;
