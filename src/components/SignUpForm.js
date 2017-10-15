import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  onInputChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit() {
    if (this.state.name.length > 2) {
      this.props.onSignUpFormSubmit(this.state.name);
    }
  }

  render() {
    return(
      <form
        className={ 'pure-form pure-form-stacked' }
        onSubmit={ (e) => preventDefaultHelper(e, this.handleSubmit, this) }
      >
        <fieldset>
          <label htmlFor={ 'name' }
          >
            Name
          </label>
          <input
            id={ 'name' }
            type={ 'text' }
            value={ this.state.name }
            onChange={ (e) => this.onInputChange(e) }
            placeholder={ 'Name' }
          />
          <span
            className={ 'pure-form-message' }
          >
            This is a required field.
          </span>
          <br />
          <button
            type={ 'submit' }
            className={ 'pure-button pure-button-primary' }
          >
            Sign Up
          </button>
        </fieldset>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  onSignUpFormSubmit: PropTypes.func.isRequired
};

export default SignUpForm;
