'use strict';

import React, {PureComponent} from 'react';
//styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';
//Components
import ControlPanel from '../../containers/control-elements/ControlPanel.js';

class MainPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div styleName="main-panel">
                <ControlPanel/>
            </div>
        );
    }
}

export default CSSModules(MainPanel, styles);
