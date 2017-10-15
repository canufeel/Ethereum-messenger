import AuthenticationContract from '../../build/contracts/Authentication.json';
import contract from 'truffle-contract';

export const getAuthenticationCoinBase = async(web3) => {
  const authentication = contract(AuthenticationContract);
  authentication.setProvider(web3.currentProvider);
  const coinbase = await new Promise((resolve, reject) => {
    web3.eth.getCoinbase((error, coinbaseVal) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(coinbaseVal);
      }
    });
  });
  return {
    coinbase,
    authentication
  };
};
