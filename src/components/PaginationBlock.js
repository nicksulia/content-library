var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {
        if(this.props.paginationKey.current === this.props.keys.key) {
            var active = 'active';
        }
        else {
            active = '';
        }
        return(
            <li onClick={this.onClick}><a className={active} href="#">{this.props.keys.key+1}</a></li>
        )
    },
    onClick:function (ev) {
        ev.stopPropagation();
        AppActions.changeCurrentPage(this.props.keys.key);
    }
});

module.exports = ContentBlock;