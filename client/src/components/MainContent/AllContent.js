var React = require('react');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var ContentBlock = require('../ContentBlock');

var AllContent = React.createClass({
    render: function () {
        if(this.props.content.length) {
            var display = this.props.content[this.props.paginationKey].map(function (data, i) {
                            return (
                                <ContentBlock content={data} key={i}/>
                            )
                        });

        } else {
            display = '';
        }
        return(
            <div>
                <h3 className="text-center">All Content</h3>
                {display}
            </div>
        )
    },
});

module.exports = AllContent;