$(function(){
   window.App = {
   	 Models : {},
   	 Views :{},
   	 Collections :{}
   };

   //хелпер шаблон 
   var template = function (id){
   	 return _.template($("#" + id).html());
   };

   App.Models.Task = Backbone.Model.extend({
   	validate : function (attrs){
   		if (! $.trim(attrs.title)) {
   			return "Введите строку!";
   		}
   	}
   });
   App.Views.Task = Backbone.View.extend({
   	 initialize : function (){
       this.model.on("change",this.render,this);
       this.model.on("destroy",this.remove,this);
   	 },
   	 tagName : "li",
   	 template : template("taskTemplate"),
   	 render : function(){
   	 	 var template = this.template(this.model.toJSON());
   	   this.$el.html(template);
   	   return this;	
   	 },

   	 events : {
   	 	 "click .edit" : "taskEdit",
   	 	 "click .delete" : "destroy"
   	 },
   	 destroy : function (){
           this.model.destroy();
   	 },
   	 remove : function (){
       this.$el.remove();
   	 },
   	 taskEdit : function (){
   	 	 var taskCorect = prompt("Как изменим задачу ?",this.model.get("title"));
   	 	 this.model.set({"title":taskCorect},{validate:true});
   	 }
   });

   App.Views.AddTask = Backbone.View.extend({
       el:"#addTask",
       events:{
         "submit" : "submit"
       },
       submit : function (e){
       	 e.preventDefault();
         var newTask = $(e.currentTarget).find("input[type=text]").val();
         var newCollection = new App.Models.Task({title:newTask});
         this.collection.add(newCollection);
       }
   });

   App.Collections.Task = Backbone.Collection.extend({
      model : App.Models.Task
   });

   App.Views.Tasks = Backbone.View.extend({
   	 initialize : function (){
       this.collection.on("add",this.addOne,this);
   	 },
     tagName : "ul",
     render : function(){
     	this.collection.each(this.addOne,this);
     	return this; 
     },
     addOne : function(task){
     	//Создаем новый дочерний вид
      var taskView = new App.Views.Task({ model : task});
     	//Добавляем его , в данном случае, в ul
     	this.$el.append(taskView.render().el);
     }
   });

   var tasksCollection = new App.Collections.Task([
     {
       title : "Сходить в магазин",
   	   priority : 4
     },
     {
       title : "Ознакомиться с gulp",
   	   priority : 3
     },
     {
      title : "Ознакомиться с git",
   	  priority : 5
     }
   	]);

   var tasksView = new App.Views.Tasks({ collection : tasksCollection });

   var taskAdd = new App.Views.AddTask({collection : tasksCollection});

   $(".task").html(tasksView.render().el);
});