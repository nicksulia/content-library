var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var PaginationBlock = require('./PaginationBlock.js');

var PaginationList = React.createClass({
    render: function () {
        if(this.props.content[0]) {
            var contentBlock = this.props.content.map(function (data, i) {
                return (
                    <PaginationBlock content={data} key={i}/>
                )
            });
        } else {
            contentBlock = '';
        }
        return(
            <div>

                <h3 className="text-center">Results</h3>
                {
                    contentBlock
                }
            </div>
        )
    },
});

module.exports = PaginationList;