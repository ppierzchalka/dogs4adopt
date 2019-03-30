const mongoose = require('mongoose'),
    random = require('mongoose-simple-random');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    dataLocation: {
        type: String,
        required: true,
        trim: true,
    }
});
dogSchema.plugin(random);

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog