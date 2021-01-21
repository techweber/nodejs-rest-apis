var express = require('express');
var app = express();
var fs = require('fs');

// list Users API
app.get('/listUsers',function(req,res){
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		console.log(data);
		res.end(data);
	});
});

user = {
	"user3":{
		"name": "rob",
		"password": "password3",
		"profession": "librarian",
		"id": 3
	}
};

// Rest API for adding a new user
app.post('/addUser',function(req,res){
	// First read existing users
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		data = JSON.parse(data);
		data["user3"] = user["user3"];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

// Rest API for fetching specific user data by user id
app.get('/:id',function(req,res){
	// First read existing users.
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		var users = JSON.parse(data);
		var user = users["user"+req.params.id];
		console.log(user);
		res.end(JSON.stringify(user));
	});
});

// Rest API for deleting a user
// 127.0.0.1/deleteUser/2
app.delete('/deleteUser/:id',function(req,res){
	// First read existing users
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		data = JSON.parse(data);
		delete data["user"+req.params.id];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});


var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s',host,port);
});

