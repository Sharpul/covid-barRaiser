var mongoose = require('mongoose')
var promise = require('promise')

var zonesSchema = mongoose.Schema({
	numCases : {
		type : Number
	},
	zoneType : {
		type : String
	}
	,
	pinCode : {
		type : String
	}
})

var zonesModel =module.exports = mongoose.model('zones', zonesSchema);

module.exports.getZoneData = function(pinCode, callback){
	return new promise(function( resolve , reject){
		zonesModel.find({ pinCode : pinCode })
		.then(function(result){
			return resolve(result);
		})
	})	
}

module.exports.updateZones = function(pinCode, dataToUpdate, callback){
	return new promise(function( resolve , reject){
		zonesModel.update({ pinCode : pinCode } , dataToUpdate )
		.then(function(result){
			return resolve(result);
		})
	})	
}
