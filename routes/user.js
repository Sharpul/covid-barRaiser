var express = require('express')
var router = express.Router()
var userModel = require('../src/models/userModel')


router.post('/userSignup' , function(req,res,next){
	let userData = req.body;
	
	const checkExistingAdmin = () =>{
		return new promise(function( resolve , reject){
			userModel.checkExistingUser(userData.phoneNumber)
			.then(function(userData){
				if(false == underScore.isEmpty(userData)){
					return res.status(400).json({status : 0 , statusMessage : 'User Already Exists' , response : ''})
				}
				return resolve('');
			})
		})
	}

	const registerUser = () =>{
		return new promise(function( resolve , reject){
			userModel.createUser(userData)
			.then(function(createdUserData){
				return res.status(200).json({ userId : createdUserData._id})
			})
		})
	}

	checkExistingUser()
	.then(registerUser)
})

router.post('/selfAssessment' , function(req,res,next){
	let userData = req.body;
	
	const calculateRisk = () =>{
		return new promise(function( resolve , reject){
			let userSymptoms = userData.symptoms;
			let riskPercentage=5;
			if(userSymptoms.length == 0 && userData.travelHistory == false &&  userData.contactWithCovidPatient == false ){
				riskPercentage=5
			}else if(userSymptoms.length == 1 && userData.travelHistory == true &&  userData.contactWithCovidPatient == true ){
				riskPercentage=50
			}else if(userSymptoms.length == 2 && userData.travelHistory == true &&  userData.contactWithCovidPatient == true ){
				riskPercentage=75
			}else if(userSymptoms.length > 2 && userData.travelHistory == true &&  userData.contactWithCovidPatient == true ){
				riskPercentage=95
			}
			userData.riskPercentage=riskPercentage;
			return resolve(userData)
		})
	}

	const updateUser = (userData) =>{
		return new promise(function( resolve , reject){
			userModel.updateUser(userData.userId , userData)
			.then(function(updatedUserData){
				return res.status(200).json({ "riskPercentage" : userData.riskPercentage })
			})
		})
	}

	

	calculateRisk()
	.then(updateUser)
})



module.exports = router