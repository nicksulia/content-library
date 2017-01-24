var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var config = require('../../config.js');


var ContentBlock = React.createClass({
    render: function () {
        var date = new Date(Date.parse(this.props.content.createdAt));
        var poster = config.apiPrefix+'/'+this.props.content.poster;
        var link = config.apiPrefix+'/'+this.props.content.resources[0];
        if (date.getMonth() < 9) {
            var month = "0" + (parseInt(date.getMonth()) + 1);
        } else {
            month = (parseInt(date.getMonth()) + 1);
        }
        return(
            <div className="well">
                <div className="row">
                    <div className="col-md-4">
                        <img className="thumbnail" src={poster}/>
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.content.title}</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Created: {date.getDate()}.{month}.{date.getFullYear()} at {date.getHours()}.{date.getMinutes()}</li>
                            <li className="list-group-item"><p>Description: {this.props.content.text}</p></li>
                        </ul>
                        <a className="btn btn-primary" href={link}>Go to {this.props.content.contentType}</a>
                    </div>
                </div>
            </div>
        )
    },
});

module.exports = ContentBlock;