var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {
        return(
            <div className="well">
                <button className="btn btn-primary" onClick={this.onClick}>Sort</button>
                <label> by :</label>
                <select ref="sorttype" className="selectpicker">
                    <option value='title' selected>Title</option>
                    <option value='createdAt'>Date</option>
                    <option value='text'>Description</option>
                </select>
                <input type="text" ref="filter" onChange={this.onFilterFormChange}/>
                <label> Filter by :</label>
                <select onChange={this.onFilterValueChange} ref="filtertype" className="selectpicker">
                    <option value='title' selected>Title</option>
                    <option value='createdAt'>Date</option>
                    <option value='text'>Description</option>
                </select>
            </div>
        )
    },
    onFilterValueChange:function (ev) {
        ev.preventDefault();
        AppActions.setFilter(this.refs.filtertype.value);
    },
    onClick:function (ev) {
        ev.preventDefault();
        AppActions.sortContent(this.refs.sorttype.value);
    },
    onFilterFormChange:function (ev) {
        ev.preventDefault();
        AppActions.filterContent(this.refs.filter.value);
    }
});

module.exports = ContentBlock;