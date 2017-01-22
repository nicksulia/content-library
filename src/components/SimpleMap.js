const React =require('react');

const ARC_DE_TRIOMPHE_POSITION = {
    lat: 48.873947,
    lng: 2.295038
};

const EIFFEL_TOWER_POSITION = {
    lat: 48.858608,
    lng: 2.294471
};

var Map = React.createClass({
    componentDidMount:function () {
        this.map = new google.maps.Map(this.refs.map, {
            center: EIFFEL_TOWER_POSITION,
            zoom: 16
        });
    },
    panToArcDeTriomphe:function() {
        console.log(this)
        this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
    },
    render:function () {
        const mapStyle = {
            width: 500,
            height: 300,
            border: '1px solid black'
        };
        return (
            <div>
                <button onClick={this.panToArcDeTriomphe}>Go to Arc De Triomphe</button>
                <div ref="map" style={mapStyle}>I should be a map!</div>
            </div>
        )
    }

});

module.exports = Map;