var express = require('express');
var router = express.Router();
var path = require('path');
var UData = require('../model/user-data');//Udata is the Db Object created//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data');//connecting to the DB named data//




/* GET home page. */
router.get('/', function(req, res) {

  // res.render('index',{title:'Node app'});/*/will render the index.ejs inside our views folder to our route whenever we make a GET request or the server will serve
  // this file /*/
  req.session.visited = Date.now();
  var time = req.session.visited;

  res.send('Welcome'+ " "+ req.session.user.email+ "<br>") ;
});

router.get('/home',function(req,res){

  res.render('home');
});

router.get('/signup',function(req,res) {
  res.render('Signup');



});


router.get('/thanks',function(req,res){
    res.send('<h1 style="color:green">Thanks For Your Response, You are now a registered User!!</h1>');
});

router.get('/login:error',function(req,res){
  res.render('loginerr');
});
router.post('/postform',function(req,res) {

    var item = {

      email:req.body.email,
      password : req.body.password,
      username:req.body.uname
    }
    var Newdata = new UData(item);
    Newdata.save(function(err){
      if(err)
      {
      console.log(err);
      return res.status(404).send();
    }

    res.redirect("/thanks");
    });
});



router.get('/formdata',function(req,res,next) {
  UData.find({},function(err,docs){
    if(!err){
			res.json(docs); //sending the Data in DB in response to the client//
		}
		else {
			next(err);
		}
  });


});





router.get('/log',function(req,res){
  res.render('login');
});

router.get('/logout',function(req,res){
    req.session.destroy(function() {
      console.log('User Successfully Logged Out');
    });
    res.redirect('/log');

});




router.post('/isUser',function(req,res) {
  var  pass = req.body.pass;
  var user =  req.body.unam;
//checking if username and his password matches with data in Mongo DB
//SYNTAX--- model_name.findOne(query,callback)//
UData.findOne({username: user , password: pass},function(err,user){
    if(err){
      console.log(err);
      return res.status(500).send();

    }
    if(!user){
          res.status(404);//User not found//
          res.redirect('/log');
      // return res.redirect('/login:error');
    }
      req.session.user  = user; //on finding the user --storing the user in the session//
     return res.redirect('/dashboard');

  });
});

router.get('/dashboard',function(req,res)  {

  //dashboard only after Authentication of the user ie after login//
  if(!req.session.user) { //if the user data is not stored in the cookie or To check if user data is stored in the session//
    return res.send(404);
  }
  // return res.send('<h1>Session successfully Restored for logged in User, Refresh the page to see the magic</h1>');
  //if user data is stored in the session//
  req.session.visited = new Date();

  res.render('dash', { Name:req.session.user.username, time:req.session.visited , email: req.session.user.email });
});










module.exports = router; //exporting the routes for use in other modules//
