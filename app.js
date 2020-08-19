var express  = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// var itemOne = Todo({ToDo:'WW'}).save(function(err){
//   if(err) console.log(err);
//   console.log('saved');
// });

app.set('view engine','ejs')

//static files
app.use(express.static('./assets'));

//fire controllers
todoController(app);
//Listen to port
app.get('/' , function(req,res){


  res.send('obj');


});
app.listen(5555);
console.log('Port 5555');
