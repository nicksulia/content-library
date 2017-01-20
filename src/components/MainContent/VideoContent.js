var React = require('react');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var ContentBlock = require('../ContentBlock');

var VideoContent = React.createClass({
    render: function () {
        if(this.props.content[0]) {
            var contentBlock = this.props.content.map(function (data, i) {
                return (
                    <ContentBlock content={data} key={i}/>
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

module.exports = VideoContent;