var React = require('react');
var AppActions = require('../actions/AppActions');
//var AppStore = require('../stores/AppStore');
//var SearchForm = require('./SearchForm.js');
//var MovieResults = require('./MovieResults');
var NavBar = require('./NavBar');
var Gallery = require('./Gallery');
var About = require('./About');
var Content = require('./MainContent');

var App = React.createClass({
    getInitialState:function () {
        return {
            page:'content'
        }
    },
    handleContentClick: function(){
        this.setState({
            page:'content'
        })
    },
    handleGalleryClick: function(){
        this.setState({
            page:'gallery'
        })
    },
    handleAboutClick: function(){
        this.setState({
            page:'about'
        })
    },
    // componentDidMount: function () {
    //     AppStore.addChangeListener(this._onChange);
    // },
    // componentWillUnmount: function () {
    //     AppStore.removeChangeListener(this._onChange);
    // },
    render: function () {
        if(this.state.page == 'content'){
            var page = <Content/>;
        }else if(this.state.page == 'about'){
            page = <About />;
        }else if(this.state.page == 'gallery'){
            page = <Gallery/>;
        }
        return(
            <div>
                <NavBar
                    page={this.state.page}
                    contentClick={this.handleContentClick}
                    galleryClick={this.handleGalleryClick}
                    aboutClick={this.handleAboutClick}
                />
                {page}
            </div>
        )
    },
});

module.exports = App;