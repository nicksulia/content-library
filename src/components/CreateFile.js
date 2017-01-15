var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getUploadState() {
    return AppStore.getStreamingData();
}

var CreateFile = React.createClass({
    getInitialState:function () {
        return getUploadState();
    },
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },
    render: function () {
        if(this.state.complete){
            var complete = <p>Uploading Complete!</p>;
        } else if(this.state.size){
            complete = <p>Streaming... sent {this.state.sent} / {this.state.size} bytes.</p>;
        } else complete = '';
        return(
            <div>
                <h1>File Creation</h1>
                <form onSubmit={this.onSubmit}>
                        <input type="file" ref="file"/>
                        <input type="submit" value="Upload" />
                </form>
                {complete}
            </div>
        )
    },
    _onChange:function () {
        this.setState(getUploadState());
    },
    onSubmit:function (e) {
        e.preventDefault();
        var file = {
            content:this.refs.file,
            type:this.refs.file.files[0].type,
            name:this.refs.file.files[0].name,
            size:this.refs.file.files[0].size
        };
        AppActions.sendFile(file);
    }
});

module.exports = CreateFile;