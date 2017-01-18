var React = require('react');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');

var AllContent = React.createClass({
    render: function () {
        return(
            <div className="scroll">
            <h1>All Content</h1>
            </div>
        )
    },
});

module.exports = AllContent;