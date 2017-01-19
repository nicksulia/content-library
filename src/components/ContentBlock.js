var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var ContentBlock = React.createClass({
    render: function () {
        var poster = 'http://192.168.1.4:3000/'+this.props.content.poster;
        var link = 'http://192.168.1.4:3000/'+this.props.content.resources[0];
        return(
            <div className="well">
                <div className="row">
                    <div className="col-md-4">
                        <img className="thumbnail" src={poster}/>
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.content.title}</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Created: {this.props.content.createdAt}</li>
                            <li className="list-group-item"><p>Description: {this.props.content.text}</p></li>
                        </ul>
                        <a className="btn btn-primary" href={link}>Go to video</a>
                    </div>
                </div>
            </div>
        )
    },
});

module.exports = ContentBlock;