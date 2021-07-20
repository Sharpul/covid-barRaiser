var express = require('express')
var app = express()

port = 8080

var mongoose = require('mongoose')
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var zonesRouter = require('./routes/zones');
mongoose.connect('mongodb://127.0.0.1:27017/covid' , { useNewUrlParser : false , useCreateIndex : true } , function(error){
	if(error) throw error
})

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/zones',zonesRouter)

app.listen(port , function(error){
	if(error) throw error
	console.log("server running on port :" , port);
})

module.exports = app