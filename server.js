var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/secretdiary');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	author: String,
	title: String,
	description: String
});

mongoose.model('Note', NoteSchema);

var Note = mongoose.model('Note');

/*var note = new note({
	author: 'Michael',
	title: 'Michael\'s note',
	url: 'http://michaelsnote.com'
});
note.save();*/

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ROUTES

app.get('/api/notes', function(req, res) {
	Note.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log("Received a GET request for _id: " + item._id);
		})
		res.send(docs);
	});
});

app.post('/api/notes', function(req, res) {
	console.log('Received a POST request:')
	for (var key in req.body) {
		console.log(key + ': ' + req.body[key]);
	}
	var note = new Note(req.body);
	note.save(function(err, doc) {
		res.send(doc);
	});
});

app.delete('/api/notes/:id', function(req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	Note.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
});

app.put('/api/notes/:id', function(req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	Note.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
	});
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);