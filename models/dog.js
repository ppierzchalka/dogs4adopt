const mongoose = require('mongoose'),
    random = require('mongoose-simple-random'),
    paginate = require('mongoose-paginate-v2');

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

const dogSchemaPlugins = [random, paginate];

dogSchemaPlugins.forEach(plugin => dogSchema.plugin(plugin));

const Dog = mongoose.model('Dog', dogSchema)

module.exports = Dog