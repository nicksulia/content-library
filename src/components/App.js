var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
//var SearchForm = require('./SearchForm.js');
//var MovieResults = require('./MovieResults');
var NavBar = require('./NavBar');
var Gallery = require('./Gallery');
var About = require('./About');
var Content = require('./MainContent');

function getAppState() {
    return {
        page:AppStore.getSectionState()
    }
}

var App = React.createClass({
    getInitialState:function () {
        return getAppState();
    },

    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },
    render: function () {
        if(this.state.page == 'content' || this.state.page == ''){
            var page = <Content/>;
        }else if(this.state.page == 'about'){
            page = <About />;
        }else if(this.state.page == 'gallery'){
            page = <Gallery/>;
        }
        return(
            <div>
                <NavBar/>
                {page}
            </div>
        )
    },
    _onChange:function () {
        this.setState(getAppState());
    }
});

module.exports = App;