import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import View from '../../components/control-elements/ControlPanel.js'
import mapStateToProps from './state-to-props.js';
import {
    setCursor,
    setFilteringOptions,
    setFilteringType,
    setSearchingType,
    setSearchingValue,
    setSortingType,
    getData
} from '../../actions/initActions.js';

const actionCreators = {
    setCursor,
    setFilteringOptions,
    setFilteringType,
    setSearchingType,
    setSearchingValue,
    setSortingType,
    getData
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const ControlPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(View);

export default ControlPanel;