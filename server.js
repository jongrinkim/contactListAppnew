var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	console.log("I received a GET request")

	db.contactlist.find(function (err, docs){
		console.log(docs);
		res.json(docs);
		}); 
});

app.post('/contactlist', function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	})
	
});

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	//Step 38: delete content from mongodb database
	//Idenfiy the contect remove by ID 
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc); //send back the item that we are removing back to controller
	}); 
});

//respond to the GET request from controller
//Will test the code as well as send back all the data for contact that we are requested back to controller
app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//name of what I wanna post to show up on terminal
	console.log(req.body.name);
});

app.listen(3000);
console.log("Server running on port 3000");
