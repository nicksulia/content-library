var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Gallery = React.createClass({
    render: function () {
        return(
            <h1>Gallery Content(with Flux!)</h1>
        )
    },
});

module.exports = Gallery;