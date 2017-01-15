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
var socket = {};
var uploader = {};
var _complete = false;
var AppStore = assign({},EventEmitter.prototype,{
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
    getUploadInfo:function () {
        return uploadInfo;
    },
    setSectionState:function (section) {
        _section = section;
        _content = arguments[1];
    },
    getSectionState:function () {
        return {
            page:_section,
            content:_content
        }
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
            console.log('Changing section to '+action.section);
            AppStore.setSectionState(action.section,action.content);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.FILE_SEND:
            AppAPI.sendFile(action.file,uploader);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SOCKET_READY:
            socket = AppAPI.socketCreate();
            uploader = AppAPI.uploaderCreate(socket);
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
    }

    return true;
});

module.exports = AppStore;