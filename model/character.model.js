const { Schema, model } = require('mongoose')

const comicSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String
    }
});

const characterSchema = new Schema({
id: {
    type: Number,
    required: true,
},
name: {
    type: String,
    required: true,
},
description: {
    type: String
},
modified: {
    type: Date
},
thumbnail: {
    type: String
},
comics: {
    type: [comicSchema]
}
});
module.exports = model('character', characterSchema);