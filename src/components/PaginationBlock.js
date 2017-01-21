var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {

        return(
            <li onClick={this.onClick}><a href="#">{this.props.keys.key+1}</a></li>
        )
    },
    onClick:function (ev) {
        console.log(this.props.keys.key);
        ev.stopPropagation();
        AppActions.changeCurrentPage(this.props.keys.key);
    }
});

module.exports = ContentBlock;