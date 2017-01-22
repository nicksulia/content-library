var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {
        return(
            <div className="well">
                <button className="btn btn-primary" onClick={this.onClick}>Sort</button>
                <select ref="sorttype" className="selectpicker">
                    <option value='title' selected>Title</option>
                    <option value='createdAt'>Date</option>
                    <option value='text'>Description</option>
                </select>
                <input type="text" ref="filter" onChange={this.onChange}/>

            </div>
        )
    },
    onClick:function (ev) {
        ev.preventDefault();
        AppActions.sortContent(this.refs.sorttype.value);
    },
    onChange:function (ev) {
        ev.preventDefault();
        console.log(this.refs.filter.value);
        AppActions.filterContent(this.refs.filter.value);
    }
});

module.exports = ContentBlock;