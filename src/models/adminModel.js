var mongoose = require('mongoose')
var promise = require('promise')

var adminSchema = mongoose.Schema({
	name : {
		type : String
	},
	phone : {
		type : String
	},
	pincode : {
		type : String
	}
})

var adminModel = module.exports = mongoose.model('admin', adminSchema);

module.exports.checkExistingUser = function(phoneNumber, callback){
	return new promise(function( resolve , reject){
		adminModel.find({ phoneNumber : phoneNumber })
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.createUser = function(userData, callback){
	return new promise(function( resolve , reject){
		adminModel.create(userData)
		.then(function(result){
			return resolve(result);
		})
	})	
}