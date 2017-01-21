var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var PaginationBlock = require('./PaginationBlock.js');

var PaginationList = React.createClass({
    render: function () {
        if(this.props.keys) {
            var paginationBlock = [];
            for (var i = 0; i < this.props.keys;i++) {
                paginationBlock[i] = i;
            }
            paginationBlock = paginationBlock.map(function (i) {
                    return (
                        <PaginationBlock keys={{"key":i}}/>
                    )
                })


        } else {
            paginationBlock = '';
        }
        return(
                <ul className="pagination">
                    {
                        paginationBlock
                    }
                </ul>
        )
    },
});

module.exports = PaginationList;