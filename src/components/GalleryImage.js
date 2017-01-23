const React = require('react');
const AppActions = require('../actions/AppActions');
const AppStore = require('../stores/AppStore');

var Gallery = React.createClass({

    render:function () {
        return (
            <li>
                <a>
                    <img ref="image" onLoad={this.onLoadImage} src={this.props.imageUrl} alt=""/>
                </a>
            </li>
        )
    },
    onLoadImage:function (e) {
        e.preventDefault();
        if(this.refs.image.height > this.refs.image.width) {
            var cursor = this.refs.image.height / this.refs.image.width;
            this.refs.image.width = 300;
            this.refs.image.height = 300*cursor;
        } else if(this.refs.image.width > this.refs.image.height){
            cursor = this.refs.image.width / this.refs.image.height;
            this.refs.image.height = 300;
            this.refs.image.width = 300*cursor;
        }
    }
});

module.exports = Gallery;