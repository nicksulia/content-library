var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {
        return(
            <div className="well">
                <button className="btn btn-primary" onClick={this.onClick}>Sort</button>
            </div>
        )
    },
    onClick:function (ev) {
        ev.preventDefault();
        AppActions.sortContent('title');
    }
});

module.exports = ContentBlock;