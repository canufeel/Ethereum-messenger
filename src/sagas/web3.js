import { web3 as web3Actions } from '../actions';
import Web3 from 'web3';
import { put } from 'redux-saga/effects';

export function* initializeWeb3() {
  try {
    let web3 = window.web3;
    let results;
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3Instance: web3
      };

      console.log('Injected web3 detected.');
    } else {
      // Fallback to localhost if no web3 injection.

      const provider = new Web3.providers.HttpProvider('http://localhost:8545');

      web3 = new Web3(provider);

      results = {
        web3Instance: web3
      };

      console.log('No web3 instance injected, using Local web3.');
    }
    yield put(web3Actions.web3Initialized(
      results
    ));
    console.log('Web3 initialized!');
  } catch (e) {
    console.log('Error in web3 initialization.');
  }
}
