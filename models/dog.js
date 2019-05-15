const mongoose = require('mongoose'),
    random = require('mongoose-simple-random');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    link: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    dataLocation: {
        type: String,
        trim: true,
    }
});
dogSchema.plugin(random);

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog