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
var _currentPage = 0;
var paginationCursor = 1;
var _paginatedData = [];
var _filterType = 'title';
var _currentData = [];
var _paginatedPagesCount = 1;
var AppStore = assign({},EventEmitter.prototype,{
    setPagesCount:function (value) {
        _paginatedPagesCount = value
    },
    getPagesCount:function () {
        return _paginatedPagesCount;
    },
    setPagination:function (value) {
        paginationCursor = parseInt(value);
        this.setCurrentPage(0);
        this.setPaginatedData(_currentData);
    },
    sendMeta:function (meta) {
        AppAPI.createContent(meta);
    },
    setFilter:function (value) {
        _filterType = value;
    },
    filterContent:function (filterBy) {
        this.setCurrentPage(0);
        var data = _data.filter(function (el) {
            if(el[_filterType].toLowerCase().indexOf(filterBy.toLowerCase()) !== -1) {
                return el;
            }
        });
        this.setPaginatedData(data);
    },
    sortContent:function (sortBy) {
        _data = _data.sort(function (a,b) {
            // if(a[sortBy] > b[sortBy]) {
            //     return 1;
            // }
            // if(a[sortBy] < b[sortBy]) {
            //     return -1;
            // }
            // if(a[sortBy] === b[sortBy]) {
            //     return 1;
            // }
            return a[sortBy].localeCompare(b[sortBy]);
        });
        this.setPaginatedData(_data);
    },
    setCurrentPage:function (page) {
        _currentPage = page;
    },
    getCurrentPage:function () {
        return _currentPage;
    },
    getPaginatedData: function () {
        return _paginatedData;
    },
    setPaginatedData:function (data) {
        if(data.length) {
            _currentData = data;
            var pointer = 0;
            this.setPagesCount(Math.ceil(_currentData.length/paginationCursor));
            var cursor = this.getPagesCount();
            for(var i = 0;i < cursor;i++){
                _paginatedData[i] = [];
                for(var j = 0; j < paginationCursor;j++) {
                    _paginatedData[i].push(data[pointer++]);
                    if(data.length === pointer) {
                        break;
                    }
                }
            }
        } else _paginatedData = [[]];
    },
    setContentData:function (data) {
        this.setCurrentPage(0);
        if (_content === 'all') {
            _data = data;
        } else {
            _data = data.filter(function (el) {
                if(el.contentType === _content) {
                    return el;
                }
            })
        }
        this.setPaginatedData(_data);
    },
    getContentData:function () {
        return _data;
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
            AppAPI.createContent(action.meta);
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
        case AppConstants.CHANGE_CURRENT_PAGE:
            AppStore.setCurrentPage(action.page);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SORT_CONTENT:
            AppStore.sortContent(action.sortBy);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.FILTER_CONTENT:
            AppStore.filterContent(action.value);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SET_FILTER:
            AppStore.setFilter(action.value);
            AppStore.emitChange(CHANGE_EVENT);
            break;
        case AppConstants.SET_PAGINATION:
            AppStore.setPagination(action.value);
            AppStore.emitChange(CHANGE_EVENT);
            break;
}

    return true;
});

module.exports = AppStore;