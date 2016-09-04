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

// Backbone View for one blog

var BlogView = Backbone.View.extend({
 
 model: new Blog(),
 tagName: 'tr',
 initialize: function () {
   this.template = _.template($('.notes-list-template').html());
 },

 render: function () {
 	this.$el.html(this.template(this.model.toJSON()));
 }

});

// Backbone View for all blog

var BlogsView = Backbone.View.extend({

model: blogs,
el: $('.notes-list'),
initialize: function() {
	this.model.on('add', this.render(), this);
},

render: function () {
	
	var self = this;
	this.el.html('');

	_each(this.model.toArray(), function(blog) {
     
     self.el.append((new BlogsView({model: blog})).render().$el);
	});
}

});

