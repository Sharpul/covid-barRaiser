var express = require('express')
var router = express.Router()
var promise = require('promise')
var zonesModel = require('../src/models/zonesModel')

router.get('/zoneInfo' , function(req,res,next){
	let pinCode = req.body.pinCode;
	
	return new promise(function( resolve , reject){
		zonesModel.getZoneData(pinCode)
		.then(function(zoneData){
			return res.status(200).json({"numCases":zoneData.numCases,"zoneType":zoneData.zoneType})
		})
	})
})

module.exports=router
