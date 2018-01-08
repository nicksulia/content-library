import ReactDOM from 'react-dom';
import React from 'react';
//components
import MainPanelWrapper from './components/main-panel/MainPanelWrapper.js';

export default class AppPane {

    render(element, store) {
        ReactDOM.render(
            <MainPanelWrapper store={store}/>
            , element
        );
    }
}
