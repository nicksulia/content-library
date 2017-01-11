var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var About = React.createClass({
    render: function () {
        return(
            <h1>About Content (with Flux!)</h1>
        )
    },
});

module.exports = About;