// Backbone Model

var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		description: ''

	}
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({});

// instantiate two blogs
/*
var blog1 = new Blog({
	author: 'Kiran', 
	title: 'Test', 
	description: 'Hello'
});

var blog2 = new Blog({
	author: 'Kiran',
	 title: 'Test2', 
	 description: 'World'
});
*/

// instantiate a Collection

var blogs = new Blogs([]);

// Backbone View for one blog

var BlogView = Backbone.View.extend({
 
 model: new Blog(),
 tagName: 'tr',
 initialize: function () {
   this.template = _.template($('.notes-list-template').html());
 },

 render: function () {
 	this.$el.html(this.template(this.model.toJSON()));
 	return this;
 }

});

// Backbone View for all blog

var BlogsView = Backbone.View.extend({

model: blogs,
el: $('.notes-list'),
initialize: function() {
	this.model.on('add', this.render, this);
},

render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}

});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-note').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			description: $('.description-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.description-input').val('');
		console.log(blog.toJSON());
		blogs.add(blog);
	})
})