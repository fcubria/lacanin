'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SentenceSchema = new Schema({
    text: String,
    date: Date
});

module.exports = mongoose.model('Sentence', SentenceSchema);
