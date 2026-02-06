const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String },         
    start_date: { type: Date, required: true }, 
    end_date: { type: Date, required: true },   
    location: { type: String, required: true },
    cover_photo: { type: String },      
    is_private: { type: Boolean, default: false }, 
    organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Event', EventSchema);