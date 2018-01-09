import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import View from '../../components/content/ContentPanel.js'
import mapStateToProps from './state-to-props.js';
import {
    setDisplayedData,
    setCursor,
    getData
} from '../../actions/initActions.js';

const actionCreators = {
    setDisplayedData,
    setCursor,
    getData
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const ContentPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(View);

export default ContentPanel;