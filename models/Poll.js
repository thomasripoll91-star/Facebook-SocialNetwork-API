const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, 
    questions: [{
        title: String, 
        options: [String],
        responses: [{
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            chosen_option_index: Number // Uniquement 1 réponse possible 
        }]
    }]
});

module.exports = mongoose.model('Poll', PollSchema);