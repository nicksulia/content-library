var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var NavBar = React.createClass({
    render: function () {
        var contentActive = '',
            contactsActive = '',
            aboutActive = '',
            galleryActive = '',
            addActive = '',
            audioActive = '',
            videoActive = '',
            textActive = '';

        if(this.props.page === 'content') {
            switch (this.props.content){
                case 'all':
                    contentActive = 'active';
                    break;
                case 'audio':
                    audioActive = 'active-dropdown';
                    break;
                case 'video':
                    videoActive = 'active-dropdown';
                    break;
                case 'text':
                    textActive = 'active-dropdown';
                    break;
            }
        } else if(this.props.page === 'contacts') {
            contactsActive = 'active';
        } else if(this.props.page === 'about') {
            aboutActive = 'active';
        } else if(this.props.page === 'gallery') {
            galleryActive = 'active';
        } else if(this.props.page === 'add') {
            addActive = 'active';
        }
        return(
            <nav className="navigation-menu">
                <ul className="navigation-list">
                    <li className="dropdown-trigger" onClick={this.contentClick}>
                        <a className={contentActive} href="#">Content</a>
                        <ul className="dropdown-list">
                            <li onClick={this.textClick}><a className={textActive} href="#">Text</a></li>
                            <li onClick={this.audioClick}><a className={audioActive} href="#">Audio</a></li>
                            <li onClick={this.videoClick}><a className={videoActive} href="#">Video</a></li>
                        </ul>
                    </li>
                    <li onClick={this.galleryClick}><a className={galleryActive} href="#">Gallery</a></li>
                    <li onClick={this.contactsClick}><a className={contactsActive} href="#">Contacts</a></li>
                    <li onClick={this.aboutClick}><a className={aboutActive} href="#">About</a></li>
                    <li onClick={this.addClick}><a className={addActive} href="#">Add New</a></li>
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