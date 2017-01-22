var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Map = require('./SimpleMap');

var Contacts = React.createClass({
    render: function () {
        return(
        <div>
            <h1>Contacts Content (with Flux!)</h1>
            <Map/>
        </div>
        )
    },
});

module.exports = Contacts;