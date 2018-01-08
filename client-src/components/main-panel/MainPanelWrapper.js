'use strict';

import React, {PureComponent} from 'react';
import { Provider } from 'react-redux';
import  PropTypes from 'prop-types';
import MainPanel from './MainPanel.js';

class MainPanelWrapper extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }

    render() {
        const {
            store
        } = this.props;
        return (
            <Provider store={store}>
                <MainPanel/>
            </Provider>
        );
    }
}

export default MainPanelWrapper;
