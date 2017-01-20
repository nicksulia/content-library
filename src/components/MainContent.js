var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AllContent = require('./MainContent/AllContent');
var TextContent = require('./MainContent/TextContent');
var AudioContent = require('./MainContent/AudioContent');
var VideoContent = require('./MainContent/VideoContent');

var MainContent = React.createClass({
    render: function () {
        var content = '';
        if (this.props.content == 'all') {
            content = <AllContent content = {this.props.data}/>
        }else if (this.props.content == 'text') {
            content = <TextContent content = {this.props.data}/>
        }else if (this.props.content == 'audio') {
            content = <AudioContent content = {this.props.data}/>
        }else if (this.props.content == 'video') {
            content = <VideoContent content = {this.props.data}/>
        }
        return(
                content
        )
    }
});

module.exports = MainContent;