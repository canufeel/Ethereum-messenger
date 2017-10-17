import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      message: ''
    };
  }

  addressChanged(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      address: value
    });
  }

  messageChanged(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      message: value
    });
  }

  handleSubmit() {
    const {
      web3,
      onSendMessage
    } = this.props;
    const {
      address,
      message
    } = this.state;
    if (web3.isAddress(address)) {
      this.setState({
        address: '',
        message: ''
      });
      onSendMessage({
        web3,
        message,
        account: address
      });
    }
  }

  render() {
    const {
      address,
      message
    } = this.state;
    return (
      <form
        className={ 'pure-form pure-form-stacked' }
        onSubmit={ (e) => preventDefaultHelper(e, this.handleSubmit, this) }
      >
        <fieldset>
          <label
            htmlFor={ 'address' }
          >Address</label>
          <input
            id={ 'address' }
            value={ address }
            onChange={ (e) => this.addressChanged(e) }
          />
          <label
            htmlFor={ 'message' }
          >Message</label>
          <input
            id={ 'message' }
            value={ message }
            onChange={ (e) => this.messageChanged(e) }
          />

          <button
            type={ 'submit' }
            className={ 'pure-button pure-button-primary' }
          >Update</button>
        </fieldset>
      </form>
    );
  }
}

MessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  web3: PropTypes.object.isRequired
};

export default MessageForm;
