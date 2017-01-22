var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
//var SearchForm = require('./SearchForm.js');
//var MovieResults = require('./MovieResults');
var NavBar = require('./NavBar');
var Gallery = require('./Gallery');
var About = require('./About');
var Content = require('./MainContent');
var CreateFile = require('./CreateFile');
var Contacts = require('./Contacts');

function getAppState() {
    return {
        page:AppStore.getSectionState(),
        content:AppStore.getContentState(),
        streamingData:AppStore.getStreamingData(),
        data:AppStore.getContentData(),
        paginatedData:AppStore.getPaginatedData(),
        currentPage:AppStore.getCurrentPage()

    }
}

var App = React.createClass({
    getInitialState:function () {
        return getAppState();
    },
    componentWillMount:function () {
        AppActions.getContent();
    },
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var page = '';
        if(this.state.page == 'content'){
            page = <Content
                currentPaginationPage = {this.state.currentPage}
                content={this.state.content}
                data = {this.state.paginatedData}/>;
        }else if(this.state.page == 'about'){
            page = <About />;
        }else if(this.state.page == 'gallery'){
            page = <Gallery/>;
        } else if(this.state.page == 'add'){
            page = <CreateFile/>;
        } else if(this.state.page == 'contacts'){
            page = <Contacts/>;
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