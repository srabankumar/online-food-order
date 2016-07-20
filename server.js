var express = require('express'),
    app = express(),
    ejsLayout = require('express-ejs-layouts'),
    bodyParser = require('body-parser'),
    routes = require('./hotel.js');
    

app.use(bodyParser());
app.use(ejsLayout);
app.use(express.static('public'));

app.set('view engine','ejs');


app.get('/',routes.home);

app.all('/menu',routes.menuPost);

//app.get('/menu',routes.menuPost);



app.all('/menu/payment',routes.payment);
app.get('/menu/:name',routes.details);
app.all('/success',routes.success);

app.listen(3000,function(){
    console.log("Server is running at port 3000");

});