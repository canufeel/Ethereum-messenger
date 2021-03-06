import Web3 from 'web3';
import { web3 as web3Actions } from '../actions/index';

const getWeb3 = (store) => new Promise(function(resolve) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    let results;
    let web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3Instance: web3
      };

      console.log('Injected web3 detected.');

      resolve(
        store.dispatch(
          web3Actions.web3Initialized(
            results
          )
        )
      );
    } else {
      // Fallback to localhost if no web3 injection.

      const provider = new Web3.providers.HttpProvider('http://localhost:8545');

      web3 = new Web3(provider);

      results = {
        web3Instance: web3
      };

      console.log('No web3 instance injected, using Local web3.');

      resolve(
        store.dispatch(
          web3Actions.web3Initialized(
            results
          )
        )
      );
    }
  });
});

export default getWeb3;
