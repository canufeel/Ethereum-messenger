import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { preventDefaultHelper } from '../helpers/prevent-default-helper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address
    };
  }

  addressChanged(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      address: value
    });
  }

  handleSubmit() {
    const {
      web3
    } = this.props;
    const {
      address
    } = this.state;
    if (web3.isAddress(address)) {
      this.setState({
        address: ''
      });
      web3.eth.defaultAccount = address;
    }
  }

  render() {
    return (
      <main
        className={ 'container' }
      >
        <div
          className={ 'pure-g' }
        >
          <div
            className={ 'pure-u-1-1' }
          >
            <h1>Good to Go!</h1>
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
                  value={ this.state.address }
                  onChange={ (e) => this.addressChanged(e) }
                />

                <button
                  type={ 'submit' }
                  className={ 'pure-button pure-button-primary' }
                >Update</button>
              </fieldset>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  address: PropTypes.string.isRequired,
  web3: PropTypes.object.isRequired
};

Home.defaultProps = {
  address: ''
};

export default Home;
