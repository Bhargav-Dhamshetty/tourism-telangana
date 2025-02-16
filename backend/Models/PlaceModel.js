const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {  
        type: String
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    latitude: {  
        type: Number,
    },
    longitude: {  
        type: Number,
    },
    reviews: [{ user: String, comment: String, rating: Number }]
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
