var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var NavBar = React.createClass({
    render: function () {
        return(
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav nav-tabs">
                            <li role="presentation"><a onClick={this.contentClick} href="#">Content</a></li>
                            <li role="presentation"><a onClick={this.galleryClick} href="#">Gallery</a></li>
                            <li role="presentation"><a onClick={this.aboutClick} href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    contentClick:function () {
        AppActions.changeSection('content');
    },
    galleryClick:function () {
        AppActions.changeSection('gallery');
    },
    aboutClick:function () {
        AppActions.changeSection('about');
    }
});

module.exports = NavBar;