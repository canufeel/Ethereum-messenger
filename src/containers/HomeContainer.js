import { connect } from 'react-redux';
import {
  selectWeb3InstanceFromState,
  selectDefaultAddressFromState
} from '../selectors/web3';
import Home from '../components/Home';

const mapStateToProps = state => ({
  web3: selectWeb3InstanceFromState(state),
  address: selectDefaultAddressFromState(state)
});

const HomeContainer = connect(
  mapStateToProps,
  {}
)(Home);

export default HomeContainer;
