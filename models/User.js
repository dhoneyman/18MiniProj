const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');


const userSchema = new Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator, 'Email address is not valid'],
      },
      thoughts: {
        thoughts: [thoughtsSchema]
      },
      friends: [this],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const validator = function(email) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email)
  };


  const User = model('user', userSchema);
  
  module.exports = Student;

