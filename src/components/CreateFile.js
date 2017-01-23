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
        if(window.File && window.FileReader){
            var buttons =
                    <div>
                        <button className="btn btn-primary btn-block">Text</button>
                        <button className="btn btn-primary btn-block">Video</button>
                        <button className="btn btn-primary btn-block">Audio</button>
                    </div>
            var form =
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" ref="title" required=""/>
                    <input type="textarea" className="form-control" ref="text" required=""/>
                    <input type="file" ref="file"/>
                </div>
                <input className="" type="submit" value="Upload" />
            </form>
        } else {
            buttons =
                    <div>
                        <h3>Sorry, but your browser doesn't support <code>File API</code></h3>
                    </div>
            form = '';
        }
        return(
            <div>
                <h1>File Creation</h1>
                {buttons}
                {form}
                {complete}
            </div>
        )
    },
    _onChange:function () {
        this.setState(getUploadState());
    },
    onSubmit:function (e) {
        e.preventDefault();
        var meta = {
            title:this.refs.title.value,
            text: this.refs.text.value,
            contentType:'video'
        };
        AppActions.sendMeta(meta);
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