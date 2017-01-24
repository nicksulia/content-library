var AppActions = require('../actions/AppActions');
var io = require('socket.io-client');
var SocketIOFileClient = require('socket.io-file-client');
var config = require('../../config.js');
var axios = require('axios');

module.exports = {
    contentList:function() {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();
        var data = [];
        xhr.open('GET', config.apiPrefix+'/content', true);
        xhr.onload = function() {
            data = JSON.parse(this.responseText);
            AppActions.receiveContentResults(data);
        };

        xhr.onerror = function() {
            alert( 'Ошибка ' + this.status );
        };

        xhr.send();
    },
    createContent:function(data) {
        return axios.post(config.apiPrefix+'/content', data);
    },
    socketCreate:function () {
        return io(config.apiPrefix);
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
        } else if(file.type == 'application/pdf') {
            var uploadIds = uploader.upload(file.content,{
                uploadTo:'text'
            });
        }
    },
}