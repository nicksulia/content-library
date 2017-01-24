const mongoose = require("mongoose");

const config = require('../config.js');

require('../models/Content');

const Content = mongoose.model('Content');

exports.setUpConnection = function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

exports.contentList =  function contentList(id) {
    return Content.find();
}

exports.createContent = function createContent(data) {
    const content = new Content({
        title: data.title,
        text: data.text,
        createdAt: new Date(),
        contentType: data.contentType,
        resources: data.resources || '',
        poster: data.poster || ''
    });

    return content.save();
}

exports.deleteContent = function deleteContent(id) {
    return Content.findById(id).remove();
}

