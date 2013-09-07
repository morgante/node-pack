// we need mongoose
var mongoose = require('mongoose')
	
var sampleSchema = mongoose.Schema({
	"username": String,
	"followers": Number
});

var Sample = module.exports = mongoose.model('Sample', sampleSchema);