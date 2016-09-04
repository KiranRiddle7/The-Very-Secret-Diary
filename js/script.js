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

// instantiate a Collection

var blogs = new Blogs([blog1,blog2]);
