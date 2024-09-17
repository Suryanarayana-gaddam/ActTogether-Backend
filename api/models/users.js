const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  mobile : {
    type : Number,
    required : true
  },
  email : {
    type : String,
  },
  gender : {
    type : String,
    required : true
  },
  dob : {
    type : String
  },
  picture : {
    type : String,
  },
  role : {
    type : String,
    required : true
  },
  interests : [],
  eventsParticipated : [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  address : {
    House : String,
    Landmark :String,
    Area : String,
    City : {
      type : String,
      required : true
    },
    State : {
      type : String,
      required : true
    },
    pincode : {
      type : String,
      required : true
    }
  }
});

module.exports = mongoose.model('User', userSchema);