var express  = require('express');
var todoController = require('./controllers/todoController');
var fs = require('fs');
var app = express();
app.set('view engine','ejs')

//static files
app.use(express.static('./assets'));

//fire controllers
todoController(app);
//Listen to port
app.get('/' , function(req,res){
  var Todo = fs.readFileSync('Todo.json','utf8');
var obj;
fs.readFile('Todo.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj);
  res.json(obj);
  
});
});
app.listen(5555);
console.log('Port 5555');
