const mongoose = require('mongoose');

const url = 'mongodb://mo1064_dogs4dopt:5Onw0yVtY3S7hwFqqdhU@91.185.191.145:27017/mo1064_dogs4dopt'; // Specify Your db connection here

mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    })

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('Mongoose connected');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose disconnected'); 
  });