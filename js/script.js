// Backbone Model

var Note = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		description: ''

	}
});

// Backbone Collection

var Notes = Backbone.Collection.extend({});

// instantiate two notes
/*
var note1 = new Note({
	author: 'Kiran', 
	title: 'Test', 
	description: 'Hello'
});

var note2 = new Note({
	author: 'Kiran',
	 title: 'Test2', 
	 description: 'World'
});
*/

// instantiate a Collection

var notes = new Notes([]);

// Backbone View for one note

var NoteView = Backbone.View.extend({
 
 model: new Note(),
 tagName: 'tr',
 initialize: function () {
   this.template = _.template($('.notes-list-template').html());
 },

 render: function () {
 	this.$el.html(this.template(this.model.toJSON()));
 	return this;
 }

});

// Backbone View for all note

var NotesView = Backbone.View.extend({

model: notes,
el: $('.notes-list'),
initialize: function() {
	this.model.on('add', this.render, this);
},

render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(note) {
			self.$el.append((new NoteView({model: note})).render().$el);
		});
		return this;
	}

});

var notesView = new NotesView();

$(document).ready(function() {
	$('.add-note').on('click', function() {
		var note = new Note({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			description: $('.description-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.description-input').val('');
		console.log(note.toJSON());
		notes.add(note);
	})
})