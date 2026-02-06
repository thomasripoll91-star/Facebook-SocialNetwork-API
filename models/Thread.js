const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    // Un fil appartient à un groupe OU un événement 
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
});

// Validation personnalisée pour s'assurer de l'exclusivité 
ThreadSchema.pre('save', function(next) {
    if ((this.group_id && this.event_id) || (!this.group_id && !this.event_id)) {
        next(new Error('Un fil doit être lié à un groupe OU un événement, pas les deux.'));
    } else {
        next();
    }
});

module.exports = mongoose.model('Thread', ThreadSchema);