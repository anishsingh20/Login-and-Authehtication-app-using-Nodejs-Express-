var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Schema//
//Schema of The DAB//
var formData = new schema({
    name : { type:String,unique:false},
    email : { type:String, unique:true},
    phone : {type:String , unique: true } ,
    address: {type:String},
    postCode : { type:String,unique:false },
    country : { type:String, unique:false} ,
    card:String,
    cardNo : {type:String , unique:true} ,
    SecCode: {type:String,uniqie:true} ,
    cardName : {type:String,unique:false} ,
    reviews:{type:String , unique:false}
  });


var form = mongoose.model('shopDetails', formData); //exporting the DB Model to use in routes//
//here the name of the collection is 'shopDetails'//
module.exports = form;
