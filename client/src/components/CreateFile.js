var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getUploadState() {
    return AppStore.getStreamingData();
}

var CreateFile = React.createClass({
    returnForm:function () {
        return (
            <form onSubmit={this.onSubmit}>

                <div>
                    <label class="desc" id="title1" for="Field1">Title</label>
                    <div>
                        <input ref='title' type="text" class="field text fn" size="8" tabindex="1" required/>
                    </div>
                </div>

                <div>
                    <label class="desc" id="title4" for="Field4">
                        Description
                    </label>
                    <div>
                        <textarea ref="text" spellcheck="true" rows="10" cols="50" tabindex="4" required></textarea>
                    </div>
                </div>
                <div>
                    <label class="desc" id="title4" for="Field4">
                        File
                    </label>
                    <div>
                        <input type="file" ref="file" required/>
                    </div>
                </div>
                <div>
                    <input id="saveForm" name="saveForm" type="submit" value="Submit"/>
                </div>
        </form>
        )
    },
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
            var form = this.returnForm();
        } else {
            form =
                <div>
                    <h3>Sorry, but your browser doesn't support <code>File API</code></h3>
                </div>
        }
        return(
            <div>
                <h1>File Creation</h1>
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
        if (this.refs.file.files[0].type === 'audio/mpeg' || this.refs.file.files[0].type === 'audio/mp3' || this.refs.file.files[0].type === 'audio/mp4') {
            var contentType = 'audio';
            var check = true;
        } else if(this.refs.file.files[0].type === 'video/mp4'|| this.refs.file.files[0].type === 'video/mpeg') {
            contentType = 'video';
            check = true;
        } else if (this.refs.file.files[0].type === 'application/pdf') {
            contentType = 'text';
            check = true;
        } else {
            check = false;
            alert("Not working with such a type!")
        }
        if(check) {
            var meta = {
                "title":this.refs.title.value,
                "text": this.refs.text.value,
                "contentType":contentType
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
    }
});

module.exports = CreateFile;