const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    photos: [{
        url: String,
        posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comments: [{
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: String,
            date: { type: Date, default: Date.now }
        }]
    }]
});

module.exports = mongoose.model('Album', AlbumSchema);