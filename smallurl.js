var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlTemplate = new Schema({
  address: String,
  code: Number
});

module.exports = mongoose.model('urlTemplate', urlTemplate);