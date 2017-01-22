var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    sortContent:function (sortBy) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.SORT_CONTENT,
            sortBy:sortBy
        });
    },
    changeCurrentPage:function (page) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.CHANGE_CURRENT_PAGE,
            page:page
        });

    },
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
    changeSection: function (section,type) {
            AppDispatcher.handleViewAction({
                actionType:AppConstants.SECTION_CHANGE,
                section:section,
                type:type || ''
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