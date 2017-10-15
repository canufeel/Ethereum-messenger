import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name
    };
  }

  onInputChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit() {
    if (this.state.name.length > 2) {
      this.props.onProfileFormSubmit(this.state.name);
    }
  }

  render() {
    return(
      <form
        className={ 'pure-form pure-form-stacked' }
        onSubmit={ (e) => preventDefaultHelper(e, this.handleSubmit, this) }
      >
        <fieldset>
          <label
            htmlFor={ 'name' }
          >Name</label>
          <input
            id={ 'name' }
            type={ 'text' }
            value={ this.state.name }
            onChange={ (e) => this.onInputChange(e) }
            placeholder={ 'Name' }
          />
          <span
            className={ 'pure-form-message' }
          >This is a required field.</span>

          <br />

          <button
            type={ 'submit' }
            className={ 'pure-button pure-button-primary' }
          >Update</button>
        </fieldset>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  name: PropTypes.string.isRequired,
  onProfileFormSubmit: PropTypes.func.isRequired
};

export default ProfileForm;
