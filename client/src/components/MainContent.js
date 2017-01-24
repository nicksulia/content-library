var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AllContent = require('./MainContent/AllContent');
var TextContent = require('./MainContent/TextContent');
var AudioContent = require('./MainContent/AudioContent');
var VideoContent = require('./MainContent/VideoContent');
var PaginationList = require('./PaginationList.js');
var ControlPanel = require('./ControlPanel');

var MainContent = React.createClass({
    render: function () {
        var content = '';
        if (this.props.content == 'all') {
            content = <AllContent content = {this.props.data} paginationKey = {this.props.currentPaginationPage}/>
        }else if (this.props.content == 'text') {
            content = <TextContent content = {this.props.data} paginationKey = {this.props.currentPaginationPage}/>
        }else if (this.props.content == 'audio') {
            content = <AudioContent content = {this.props.data} paginationKey = {this.props.currentPaginationPage}/>
        }else if (this.props.content == 'video') {
            content = <VideoContent content = {this.props.data} paginationKey = {this.props.currentPaginationPage}/>
        }
        return(
            <div>
                <ControlPanel/>
                {content}
                <PaginationList keys = {this.props.paginatedPagesCount} paginationKey = {this.props.currentPaginationPage}/>
            </div>
        )
    }
});

module.exports = MainContent;