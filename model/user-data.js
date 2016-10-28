var mongoose = require('mongoose');
var schema = mongoose.Schema;
//use mongoose inbuild timestamps object , by new schema({Schema variables} , {timestamps:}  ) ; //
var data = new schema(
  {
    email :String ,
    password :{
      type:String,unique:true
    } ,
      username :{
        type: String ,
        unique:true
      }


    },
   { timestamps: { createdAt: 'createdAt', } }


);

module.exports = mongoose.model('details',data); //details is the name of the collection//
