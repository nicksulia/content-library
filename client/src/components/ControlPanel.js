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
                    <option value='title' selected>Sort Type</option>
                    <option value='title'>Title</option>
                    <option value='createdAt'>Date</option>
                    <option value='text'>Description</option>
                </select>
                <input type="text" ref="filter" onChange={this.onFilterFormChange}/>
                <label> Filter by :</label>
                <select onChange={this.onFilterValueChange} ref="filtertype" className="selectpicker">
                    <option value='title' selected>Filter Type</option>
                    <option value='title'>Title</option>
                    <option value='text'>Description</option>
                </select>
                <select onChange={this.onPaginationValueChange} ref="paginationnumber" className="selectpicker">
                    <option value='1' selected>Pagination</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='9'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
            </div>
        )
    },
    onPaginationValueChange:function (ev) {
        ev.preventDefault();
        AppActions.setPagination(this.refs.paginationnumber.value);
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