var React = require('react');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var ContentBlock = require('../ContentBlock');

var TextContent = React.createClass({
    render: function () {
        console.log('here r3');
        if(this.props.content.length) {
            var display =
                <div>
                    <h3 className="text-center">Results</h3>
                    {
                        this.props.content[this.props.paginationKey].map(function (data, i) {
                            return (
                                <ContentBlock content={data} key={i}/>
                            )

                        })
                    }
                </div>
        } else {
            display = null;
        }
        return(
            display
        )
    },
});

module.exports = TextContent;