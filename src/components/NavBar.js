var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var NavBar = React.createClass({
    render: function () {
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav nav-tabs">
                            <li role="presentation"  onClick={this.props.contentClick}><a href="#">Content</a></li>
                            <li role="presentation"><a onClick={this.props.galleryClick} href="#">Gallery</a></li>
                            <li role="presentation"><a onClick={this.props.aboutClick} href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    },
});

module.exports = NavBar;