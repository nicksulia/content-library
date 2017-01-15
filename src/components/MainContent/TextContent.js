var React = require('react');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');

var TextContent = React.createClass({
    render: function () {
        return(
            <h1>Text Content</h1>
        )
    },
});

module.exports = TextContent;