//var app = require('express');
var menus = require('./data/menu.json').Menu,
    user = {};



var getFoodDetails = function(choice)
{
     var userChoice = menus.filter(function(biriyaniName){
     
         return (biriyaniName.name === choice)
     
     }) ;
    
    return userChoice[0];
}


var choiceDetails = function(userChoice)
{
    var choices = userChoice.split(",");
    var choicesMenu = [];
    menus.forEach(function(item){
         choices.forEach(function(choice){
             //console.log(item.name);
             //console.log(choice);
            if(choice === item.name)
            {
                 choicesMenu.push(item);
            }
         })
          
         
    
    })
    return choicesMenu;
}


exports.home = function(req,res){
    res.render('home.ejs',{title:"HOTEL-HOME"});
};


exports.menuPost = function(req,res,next)
{
   // console.log(req.method);
    if(req.method == 'POST')
    {
        user.name = req.body.name;
        user.mob = req.body.mob;
    }
    res.render('menu.ejs',{title:"HOTEL-MENU",User:user,menu:menus});
    //next();
}


exports.details = function(req,res,next)
{
   var userSelection = req.params.name;
    console.log(req.body.details);
   res.render("details.ejs",{title:"menu",User:user,menu:menus,yourChoice:getFoodDetails(userSelection)});
   //res.render
}

exports.payment = function(req,res,next)
{
    var VAT = 14.5;
    //console.log()
    if(req.method == 'POST')
    {
    user.choices = choiceDetails(req.body.details);
    user.itemBills = parseInt(req.body.totalPrice,10);
    user.payableAmount =  user.itemBills + (( user.itemBills*14.5)/100);
    }
    
    //console.log("user = "  + JSON.stringify(user));
    res.render('payment.ejs',{title:"PAYMENT",user:user,vat:VAT})
    
    
}

exports.success = function(req,res)
{
  if(req.method == 'POST')
    {
       userName = user.name;
    }
  res.render('success.ejs',{title:"title",name:userName});
}