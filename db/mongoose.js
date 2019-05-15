const mongoose = require('mongoose');

const url = 'mongodb://mo1064_dogs4dopt:5Onw0yVtY3S7hwFqqdhU@91.185.191.145:27017/mo1064_dogs4dopt'; // Specify Your db connection here

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
})

""