var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _data = [];
var _section = '';

var AppStore = assign({},EventEmitter.prototype,{
    setSectionState:function (section) {
        _section = section;
    },
    getSectionState:function () {
        return _section;
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
            AppStore.setSectionState(action.section);
            AppStore.emitChange(CHANGE_EVENT);
            break;
    }

    return true;
});

module.exports = AppStore;