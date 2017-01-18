var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AllContent = require('./MainContent/AllContent');
var TextContent = require('./MainContent/TextContent');
var AudioContent = require('./MainContent/AudioContent');
var VideoContent = require('./MainContent/VideoContent');

function getContentState() {
    return {
        content:AppStore.getContentData()
    }
}

var MainContent = React.createClass({
    getInitialState:function () {
        return getContentState();
    },
    componentWillMount() {
        AppActions.getContent(this.props.content);
    },
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var content = '';
        if (this.props.content == 'all') {
            content = <AllContent/>
        }else if (this.props.content == 'text') {
            content = <TextContent/>
        }else if (this.props.content == 'audio') {
            content = <AudioContent/>
        }else if (this.props.content == 'video') {
            content = <VideoContent content = {this.state.content}/>
        }
        return(
                content
        )
    },
    _onChange:function () {
        this.setState(getContentState());
    }
});

module.exports = MainContent;