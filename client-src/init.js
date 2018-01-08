import store from './store';
import AppPane from './AppPane.js';

class AppView {
    createElement() {
        this.el = document.createElement('div');
        this.el.style.height = '100%';
        return Promise.resolve(this.el);
    }

    onInit(config) {
        this.createElement().then(el => { document.body.appendChild(el) } );
        this.state = config.state;

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