// we need mongoose
var mongoose = require('mongoose')
	
var sampleSchema = mongoose.Schema({
	"first": String,
	"last": String
});

var Sample = module.exports = mongoose.model('Sample', sampleSchema);