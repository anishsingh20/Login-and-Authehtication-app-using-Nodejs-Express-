var express = require('express');
var router = express.Router();
var form =  require('../model/form-data'); //required the users.js Schema file//
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/data'); //Connecting to the Database || Formdata is the name of the Database//


/* GET users listing. */
router.get('/shop', function(req, res, next) {
  res.render('form2');
});


router.post('/saveform',function(req,res) {
  //item to insert or save inside Db//
  var item = {
    name:req.body.Uname ,
    email:req.body.email ,
    phone:req.body.phone ,
    address:req.body.address ,
    postCode:req.body.post ,
    country:req.body.country ,
    card:req.body.options,
    cardNo:req.body.card ,
    SecCode:req.body.code ,
    cardName:req.body.cardname,
    // reviews:req.body.review

            }

    var data  = new form(item);
    //storing and saving the data inside the DB //
    data.save(function(err) {
      if(err) {
        return res.status(404).send();
      }
      //creating 'users' because 'user' already 'req.session.user' used  another database of the collections are connected to same Databsae 'data' //
      req.session.users = data ;
      //to store the user credentials in the session in the cookie//

       return res.redirect('/myDetails');
    });

  });


  router.get('/myDetails',function(req,res) {


    //if user details does not exist in the session//
    if(!req.session.users)
    {
      return res.status(401).send();
    }

         res.render('itemsbuyed',{user: req.session.users}); //using the cookie data in templates//
         //names:req.session.users.name , mails :req.session.users.email, address:req.session.users.address, number:req.session.users.phone});
        //requesting the user data from the cookies and using them in templates//
      });


//route to show all the user  who filled the form//
router.get('/show',function(req,res) {
  //to find all documents(tuples) inside the Database
    form.find({},function(err,data){
      if(err) {
        return res.status(404).send("<h1>Data Not Found Inside Database</h1>");
      }
      else {
      res.json(data);
    }
  });
});


router.get('/sessionclosed',function(req,res){
    req.session.reset();
    res.redirect('/shop');
});

router.get('/Customers',function(req,res){
    res.render('layout');
});


//route to post a review and update the DB with a review form user saved in Session//
router.post('/postreview' , function(req,res) {
    var rev  = req.body.review;

    //updating the review inside the Databsase //
    //SYNTAX To Update Dababase using Mongoose ----- model.update(query(condition), updated value or new value to add to Db ,  Callback)//
    //this will add review field(attr) for the name whose name is stored in the Session inside the cookie//
    form.update({ name:req.session.users.name },{ $set : {  reviews : rev } }  , function(err) {
      if(err) {
        return res.status(500).send("Something is wrong in your code !! Go and fix it");
      }
      else {


      return res.redirect('/myDetails');
    }

    });
});















module.exports = router;
