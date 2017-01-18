var AppActions = require('../actions/AppActions');
var io = require('socket.io-client');
var SocketIOFileClient = require('socket.io-file-client');
var axios = require('axios');


module.exports = {
    contentList:function() {
        return axios.get('http://localhost:3000/content');
    },

    createContent:function(data) {
        return axios.post('http://localhost:3000/content', data);
    },

    deleteContent:function(noteId) {
        return axios.delete(`http://localhost:3000/content/${noteId}`);
    },
    socketCreate:function () {
        return io('http://localhost:3000');
    },
    uploaderCreate:function (socket) {
        return new SocketIOFileClient(socket);
    },
    socketReady:function (uploader) {
        uploader.on('ready', function() {
            //console.log('SocketIOFile ready to go!');
        });
    },
    sendFile:function (file,uploader) {
        uploader.on('start', function(fileInfo) {
            AppActions.uploadStart();
            //console.log('Start uploading', fileInfo);
        });
        uploader.on('stream', function(fileInfo) {
            AppActions.streamInfo(fileInfo);
            //console.log('Streaming... sent ' + fileInfo.sent+ '/' + fileInfo.size + ' bytes.');
        });
        uploader.on('complete', function(fileInfo) {
            AppActions.uploadComplete(fileInfo);
            //console.log('Upload Complete');
        });
        uploader.on('error', function(err) {
            //console.log('Error!', err);
        });
        uploader.on('abort', function(fileInfo) {
            //console.log('Aborted: ', fileInfo);
        });
        if(file.type == 'audio/mp4' || file.type == 'audio/mp3' || file.type == 'audio/mpeg') {
            var uploadIds = uploader.upload(file.content,{
                uploadTo:'music'
            });
        } else if(file.type == 'video/mp4' ||  file.type == 'video/mpeg') {
            var uploadIds = uploader.upload(file.content,{
                uploadTo:'video'
            });
        }
    },
    searchMovies: function (movie) {
        $.ajax({
            url:'http://localhost:3000/content',
            dataType:'json',
            cache:false,
            success:function (data) {
                AppActions.receiveMovieResults(data.Search);
            }.bind(this),
            error:function (xhr,status,err) {
                alert(err);
            }.bind(this)
        });
    }
}