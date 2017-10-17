import { connect } from 'react-redux';
import { selectWeb3InstanceFromState } from '../selectors/web3';
import MessageForm from '../components/MessageForm';
import { message as messageActions } from '../actions';

const mapStateToProps = state => ({
  web3: selectWeb3InstanceFromState(state)
});

const MessageFormContainer = connect(
  mapStateToProps,
  {
    onSendMessage: messageActions.sendMessage
  }
)(MessageForm);

export default MessageFormContainer;
