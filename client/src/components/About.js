var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var About = React.createClass({
    render: function () {
        return(
        <div className="about">
            <h2>Some rules</h2>
            <p>Use only:</p>
            <ul>
                <li><b>.pdf</b></li>
                <li><b>.mp4(.mp3,.mpeg) audio</b></li>
                <li><b>.mp4 video</b></li>
            </ul>
        </div>

        )
    },
});

module.exports = About;