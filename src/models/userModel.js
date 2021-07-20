var mongoose = require('mongoose')
var promise = require('promise')

var userSchema = mongoose.Schema({
	name : {
		type : String
	},
	phone : {
		type : String
	},
	pincode : {
		type : String
	},
	result : {
		type : String
	},
	recovered : {
		type : String
	},
	updatedBy : {
		type : mongoose.Schema.Types.ObjectId
	},
	updatedByAdmin : {
		type :Boolean
	},
	updatedByAdminId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'admin'
	}
})

var userModel = module.exports = mongoose.model('user', userSchema);

module.exports.updateUserByAdmin = function(userId,adminId,result,userRecovered, callback){
	return new promise(function( resolve , reject){
		userModel.updateById({ _id : userId } , { result : result  , updatedByAdminId : adminId , recovered : userRecovered , updatedByAdmin : true})
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.updateUser = function(userId, userData, callback){
	return new promise(function( resolve , reject){
		userModel.updateById({ _id : userId } , userData )
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.getUserData = function(userId, callback){
	return new promise(function( resolve , reject){
		userModel.updateById({ _id : userId })
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.checkExistingUser = function(phoneNumber, callback){
	return new promise(function( resolve , reject){
		userModel.find({ phoneNumber : phoneNumber })
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.createUser = function(userData, callback){
	return new promise(function( resolve , reject){
		userModel.create(userData)
		.then(function(result){
			return resolve(result);
		})
	})	
}

