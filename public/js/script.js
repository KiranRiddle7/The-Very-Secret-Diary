// Backbone Model

var Note = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		description: ''

	}
});

// Backbone Collection

var Notes = Backbone.Collection.extend({

	url: 'http://localhost:3000/api/notes'
});

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

var notes = new Notes();

// Backbone View for one note

var NoteView = Backbone.View.extend({
 
 model: new Note(),
 tagName: 'tr',
 initialize: function () {
   this.template = _.template($('.notes-list-template').html());
 },
events: {
	'click .edit-note': 'edit',
	'click .update-note': 'update',
	'click .cancel-note': 'cancel',
	'click .delete-note': 'delete'
},

 edit: function () {
 	$('.edit-note').hide();
 	$('.delete-note').hide();
 	this.$('.update-note').show();
 	this.$('.cancel-note').show();

 	var author = this.$('.author').html();
 	var title = this.$('.title').html();
 	var description = this.$('.description').html();

 	this.$('.author').html('<input type="text" class="form-control author-update"  value="' + author + '"> ')
 	this.$('.title').html('<input type="text" class="form-control title-update"  value="' + title + '"> ')
 	this.$('.description').html('<input type="text" class="form-control description-update"  value="' + description + '"> ')



 },

 update: function () {
 	this.model.set('author', $('.author-update').val());
 	this.model.set('title' , $('.title-update').val());
 	this.model.set('description' , $('.description-update').val());
 },

cancel: function() {
      notesView.render(); 
},

delete: function () {

	this.model.destroy();
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
	var self = this;
	this.model.on('add', this.render, this);
	this.model.on('change', function() {
		setTimeout(function() {
			self.render();
		}, 30)
	},this);
	this.model.on('remove', this.render, this);

	this.model.fetch({
		success: function(response) 
		{
			_.each(response.toJSON(), 

				function(item) {

				console.log('Successfull Got Note ID:' + item._id);

			});
		},

		error: function()
		{
			console.log('Failed to get notes');
		}

	});

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
		notes.add(note);

		note.save(null, {
			success: function(response) {
				console.log('Successfully SAVED note with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save note!');
			}
		});
	});
})