var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var NavBar = React.createClass({
    render: function () {
        return(
            <nav className="navigationbar">
                <ul>
                    <li className="dropdown-top" onClick={this.contentClick}>
                        <a href="#">Content</a>
                        <ul className="hidden">
                            <li onClick={this.textClick}><a href="#">Text</a></li>
                            <li onClick={this.audioClick}><a href="#">Audio</a></li>
                            <li onClick={this.videoClick}><a href="#">Video</a></li>
                        </ul>
                    </li>
                    <li onClick={this.galleryClick}><a href="#">Gallery</a></li>
                    <li onClick={this.contactsClick}><a href="#">Contacts</a></li>
                    <li onClick={this.aboutClick}><a href="#">About</a></li>
                    <li onClick={this.addClick}><a href="#">Add New</a></li>
                </ul>
            </nav>
        )
    },
    contactsClick:function (e) {
        AppActions.changeSection('contacts');
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