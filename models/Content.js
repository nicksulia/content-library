const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    title     : { type: String, required: true },
    text      : { type: String, required: true },
    contentType     : { type: String },
    createdAt : { type: Date },
    resources : { type:Array },
    poster : { type:String }
});

mongoose.model('Content', ContentSchema);
