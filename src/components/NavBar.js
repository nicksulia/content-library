var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var NavBar = React.createClass({
    render: function () {
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav nav-tabs dropdown">
                            <li role="presentation" className="dropdown-top" onClick={this.contentClick}>
                                <a href="#">Content</a>
                                <ul className="nav nav-tabs dropdown-inside">
                                    <li onClick={this.textClick}><a href="#">Text</a></li>
                                    <li onClick={this.audioClick}><a href="#">Video</a></li>
                                    <li onClick={this.videoClick}><a href="#">Audio</a></li>
                                </ul>
                            </li>
                            <li role="presentation" onClick={this.galleryClick}><a href="#">Gallery</a></li>
                            <li role="presentation" onClick={this.aboutClick}><a href="#">About</a></li>
                            <li role="presentation" onClick={this.addClick}><a href="#">Add New</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    },
    addClick:function (e) {
        AppActions.socketReady();
        AppActions.changeSection('add');
    },
    textClick:function (e) {
        AppActions.changeSection('content','text');
        e.stopPropagation();
    },
    audioClick:function (e) {
        AppActions.changeSection('content','audio');
        e.stopPropagation();
    },
    videoClick:function (e) {
        AppActions.changeSection('content','video');
        e.stopPropagation();
    },
    contentClick:function () {
            AppActions.changeSection('content','all');
    },
    galleryClick:function () {
        AppActions.changeSection('gallery');
    },
    aboutClick:function () {
        AppActions.changeSection('about');
    }
});

module.exports = NavBar;