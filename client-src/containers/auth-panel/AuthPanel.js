import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import View from '../../components/auth-panel/AuthPanel.js'
import mapStateToProps from './state-to-props.js';
import {
    setAuthStatus,
    registerUser,
    authenticateUser,
    setToken,
    setUsername,
} from '../../actions/authActions.js';
import {
    setServerError
} from '../../actions/errorActions.js'

const actionCreators = {
    setAuthStatus,
    registerUser,
    authenticateUser,
    setToken,
    setUsername,
    setServerError
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const ContentPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(View);

export default ContentPanel;