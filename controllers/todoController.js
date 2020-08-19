// ###############################3SQL SERVER COnnection##############################
// var sql = require("mssql");
// var connection = require('tedious').Connection;
// var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES;
// var config = {
//         user: 'ww',
//         password: 'ww',
//         server: 'walid-wagdy',
//         database: 'ToDo'
//     };
// var myConnection = new connection(config);
// myConnection.on('connection',function(err){
//   if (err) console.log('error is ' + err)
// });
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0.6naub.mongodb.net/ww?retryWrites=true&w=majority');
// console.log(mongoose);
var todoSchema = new mongoose.Schema({
  ToDo: String
});
var Todo = mongoose.model('ToDo',todoSchema);
var urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
  app.get('/todo' , function(req,res){
    console.log('GET');
    try {
      Todo.find({},function(err,data){
        if (err) throw err;
          res.render('todo',{todo: data});
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/todo' ,urlEncodedParser, function(req,res){
    var newTodo =Todo(req.body).save(function(err,data){
      if (err) console.log(err)
      res.json(data);
    });
  });

  app.post('/todo/update' ,urlEncodedParser, function(req,res){
    console.log('UPDATE');
    console.log(req.body.old);
    console.log(req.body.new);
   try {
     Todo.updateOne({ToDo: req.body.old.replace(/\-/g, " ")},{ToDo:req.body.new.replace(/\-/g, " ")},function(err,data){
       if (err) throw err;
            res.json(data);
          });
   } catch (err) {
     console.log(err);
   }
  });

  app.delete('/todo/:item' , function(req,res){
      Todo.find({ToDo: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) console.log(err);
        res.json(data);
      });
  });
  
};
