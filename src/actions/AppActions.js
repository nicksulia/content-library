var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
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