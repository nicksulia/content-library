import store from './store';
import { getData } from './actions/initActions.js';
import { setToken, setUsername, setAuthStatus } from './actions/authActions.js'
import ReactDOM from 'react-dom';
import AppPane from './AppPane.js';
import { checkAccess } from './api/configAPI.js';

class AppView {
    createElement() {
        this.el = document.createElement('div');
        this.el.style.height = '100%';
        return Promise.resolve(this.el);
    }

    onInit(config) {
        if(sessionStorage.token) {
            checkAccess().then(() => {
                store.dispatch(setToken(sessionStorage.token));
                store.dispatch(setUsername(sessionStorage.username));
                store.dispatch(setAuthStatus(true));
                store.dispatch(getData({}));
            },() => {
                sessionStorage.token = '';
                sessionStorage.username = '';
            });
        }
        this.createElement().then(el => { document.body.appendChild(el) } );
        if (config) {
            this.state = config.state;
        }
        this.pane = new AppPane();
    }

    onRender() {
        this.pane.render(this.el, store);
    }

    onDestroy() {
        ReactDOM.unmountComponentAtNode(this.el);
    }
}

window.onload = () => {
    const app = new AppView();
    app.onInit();
    app.onRender();
};