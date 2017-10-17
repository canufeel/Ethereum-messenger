
export const selectWeb3InstanceFromState = (state) => state.web3.web3Instance;

export const selectDefaultAddressFromState = state => selectWeb3InstanceFromState(state).eth.defaultAccount;
