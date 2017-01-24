var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ComponentGallery = require('./GalleryImage');

var Gallery = React.createClass({

    render:function () {
        var imageUrls = ["https://farm3.staticflickr.com/2937/14197491985_58036d5b0e_z.jpg",
            "http://hdwallpapershdpics.com/wp-content/uploads/2015/08/free_high_resolution_images_for_download-1.jpg",
            "https://farm3.staticflickr.com/2937/14203620719_a0a4d323ef_z.jpg",
            "https://farm6.staticflickr.com/5516/11906727035_b5ccf50dbd_z.jpg",
            "https://farm6.staticflickr.com/5516/11906727035_b5ccf50dbd_z.jpg",
            "https://farm6.staticflickr.com/5516/11906727035_b5ccf50dbd_z.jpg",
            "https://farm6.staticflickr.com/5516/11906727035_b5ccf50dbd_z.jpg",
            "https://farm6.staticflickr.com/5495/11817560513_41b2f225a5_z.jpg"
        ];
        return (
            <section className="gallery">
                <ul>
                    {imageUrls.map((imageUrl,i) => <ComponentGallery imageUrl={imageUrl}/>)}
                </ul>
            </section>
        )
    },
});

module.exports = Gallery;