$(function(){
    window.App = {
    	Model:{},
      View : {},
      Collection :{}
    }

//хелпер шаблона 
var template = function (id){
   return _.template($("#" + id).html());
};

// шаблон
  App.Model.Person = Backbone.Model.extend({
	defaults : {
       name : "Anton",
       age : 20,
       job : "Front-end developer"
	},

	validate : function (attrs,options){
     if ( attrs.age <= 0 ){
     	return "Возраст не может быть отрицательный!";
     }

     if ( !attrs.name ){
     	return "Введите пожалуйста имя !";
     }

     if ( attrs.job == "Маркетолог" ){
     	return "Введите нормальную профессию !";
     }
	},

	walk : function (){
		return this.get("name") + " is walking";
	}
});

var person = new App.Model.Person();

//Коллекция людей
  App.Collection.People = Backbone.Collection.extend({
   model: App.Model.Person
});

//Вид людей
  App.View.People = Backbone.View.extend({
    tagName : "ul",
    initialize : function (){
    	console.log(this.collection);
    },

    render : function(){
        this.collection.each(function(person){
            var personView = new App.View.Person({model:person});

            this.$el.append(personView.render().el);
        },this);
        return this;
    }
});

//Вид предстваления человека 
  App.View.Person = Backbone.View.extend({
	 initialize : function(){
	 	this.render();
	 },
	 template : template("person-id"),
   tagName : "li",
   render : function (){
     this.$el.html( this.template(this.model.toJSON()) );
     return this;
   }
});

var peopleCollection = new App.Collection.People([
  {
    name:"Anton",
    age:20,
    job:"Front-end developer"
  },
  {
    name:"Adrew",
    age:21,
    job:"Летчик"
  },
  {
    name:"Ivan",
    age:20,
    job:"Back-end developer"
  },
  {}
]);

var peopleView = new App.View.People({collection:peopleCollection});

$("body").append(peopleView.render().el);

});