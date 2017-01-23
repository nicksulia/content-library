var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Footer = React.createClass({

    render:function () {
        return (
            <footer id="footer" className="verical-align">
                <div className="footer-cont verical-align">
                    <p>Copyright 2017 <span>Nick</span> | All Rights Reserved</p>
                </div>
            </footer>
        )
    },
});

module.exports = Footer;