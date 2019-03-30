const mongoose = require('mongoose');

const url = ''; // Specify Your db connection here

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
})