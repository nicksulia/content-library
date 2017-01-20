var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _streamingData = {};
var _data = [];
var _section = 'content';
var _content= 'all';
var uploader = {};
var _complete = false;
var _currentPage = 1;

var AppStore = assign({},EventEmitter.prototype,{

    setContentData:function (data) {
        _data = data;
    },
    getContentData:function () {
        var localData = _data;
        if(_content === 'all') {
            return localData;
        } else {
            return localData.map(function (el) {
                if(el.contentType == _content) {
                    return el;
                }
            });
        }
    },



    contentList:function () {
        //receiving _data
        AppAPI.contentList();
    },



    getStreamingData:function () {
        return _streamingData;
    },
    setStreamingData:function (file) {
        _streamingData = {
            sent:file.sent,
            size:file.size,
            complete:this.getComplete()
        }
    },
    setComplete:function (complete) {
        _complete = complete;
    },
    getComplete:function () {
        return _complete;
    },



    setSectionState:function (section) {
        _section = section;
    },
    setContentState:function (content) {
        _content = content
    },
    getSectionState:function () {
        return _section;

    },
    getContentState:function () {
        return _content;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on('change',callback);
    },
    removeChangeListener:function (callback) {
        this.removeListener('change',callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch(action.actionType){
        case AppConstants.SECTION_CHANGE:
            //console.log('Changing section to '+action.section);
            AppStore.setSectionState(action.section);
            if(action.type !== ''){
                AppStore.contentList(action.type);
                AppStore.setContentState(action.type);
            }
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.FILE_SEND:
            AppAPI.sendFile(action.file,uploader);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SOCKET_READY:
            uploader = AppAPI.uploaderCreate(AppAPI.socketCreate());
            AppAPI.socketReady(uploader);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.UPLOAD_START:
            AppStore.setComplete(action.complete);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.UPLOAD_COMPLETE:
            AppStore.setComplete(action.complete);
            AppStore.setStreamingData(action.file);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.STREAMING_DATA:
            AppStore.setStreamingData(action.file);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SEND_META:
            //TODO here we are sending meta information like description or others.
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.GET_CONTENT:
            AppStore.contentList(action.type);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_CONTENT_RESULTS:
            AppStore.setContentData(action.data);
            AppStore.emitChange(CHANGE_EVENT);
            break;
}

    return true;
});

module.exports = AppStore;