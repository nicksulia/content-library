var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    changeSection: function (section) {
        AppDispatcher.handleViewAction({
            actionType:AppConstants.SECTION_CHANGE,
            section:section
        });
    }
};


module.exports = AppActions;