var express = require('express')
var router = express.Router()
var promise = require('promise')
var underScore = require('underscore')
var adminModel = require('../src/models/adminModel')
var userModel = require('../src/models/userModel')
var zonesModel = require('../src/models/zonesModel')

router.post('/adminSignup' , function(req,res,next){
	let userData = req.body;
	
	const checkExistingAdmin = () =>{
		return new promise(function( resolve , reject){
			adminModel.checkExistingUser(userData.phoneNumber)
			.then(function(adminData){
				console.log(underScore.isEmpty(adminData))
				if(false === underScore.isEmpty(adminData)){
					return res.status(400).json({status : 0 , statusMessage : 'User Already Exists' , response : ''})
				}
				return resolve('');
			})
		})
	}

	const registerAdmin = () =>{
		return new promise(function( resolve , reject){
			console.log('innnn-----',userData)
			adminModel.createUser(userData)
			.then(function(createdUserData){
				return res.status(200).json({ adminId : createdUserData._id})
			})
		})
	}

	checkExistingAdmin()
	.then(registerAdmin)
})

router.post('/updateUsers' , function(req,res,next){
	let userId = req.body.userId;
	let adminId = req.body.adminId;
	let result = req.body.result;
	
	const getUsersInfo = () =>{
		return new promise(function( resolve , reject){
			userModel.getUserData(userId)
			.then(function(responseData){
				return resolve(responseData);
			})
		})
	}

	const updateUser = (userData) =>{
		return new promise(function( resolve , reject){
			let userRecovered=''
			if(result == "Positive"){
				userRecovered=false
			}else{
				userRecovered=true
			}
			userModel.updateUserByAdmin(userId,adminId,result,userRecovered)
			.then(function(updatedUser){
				return resolve(userData)
			})
		})
	}

	const getZoneData = (userData) =>{
		return new promise(function( resolve , reject){
			zonesModel.getZoneData(userData.pincode)
			.then(function(zoneData){
				return resolve(zoneData)
			})
		})
	}

	const updateZones = (zoneData) =>{
		return new promise(function( resolve , reject){
			let dataToUpdate={};
			let zoneCases=zoneData[0].numCases;
			let zoneType='';
			if(zoneCases+1 < 5){
				zoneType="Green"
			}else if(zoneCases+1 > 5){
				zoneType="Red"
			}
			if(result == "Positive"){
				dataToUpdate = { numCases : { $inc : 1 } };

			}else{
				dataToUpdate = { numCases : { $dec : 1 } };
			}
			dataToUpdate.zoneType=zoneType;
			zonesModel.updateZones(userData.pincode , dataToUpdate)
			.then(function(updatedData){
				return res.status(200).json({"updated":true})
			})
		})
	}

	getUsersInfo()
	.then(updateUser)
	.then(getZoneData)
	.then(updateZones)
})



module.exports=router