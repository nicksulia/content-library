var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    receiveContentResults:function (data) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.RECEIVE_CONTENT_RESULTS,
            data:data
        });
    },
    getContent: function (type) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.GET_CONTENT,
            type:type
        })
    },
    sendMeta: function (meta) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.SEND_META,
            meta:meta
        })
    },
    changeSection: function (section) {
            AppDispatcher.handleViewAction({
                actionType:AppConstants.SECTION_CHANGE,
                section:section,
                content:arguments[1] || ''
            });
    },
    sendFile:function (file) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.FILE_SEND,
            file:file
        });
    },
    socketReady:function () {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.SOCKET_READY
        });
    },
    streamInfo:function (fileInfo) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.STREAMING_DATA,
            file:fileInfo
        });
    },
    uploadStart:function () {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.UPLOAD_START,
            complete:false
        });
    },
    uploadComplete:function (fileInfo) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.UPLOAD_COMPLETE,
            file:fileInfo,
            complete:true
        });
    }

};


module.exports = AppActions;