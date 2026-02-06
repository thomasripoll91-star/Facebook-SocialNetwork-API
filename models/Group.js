const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String }, 
    icon: { type: String }, 
    cover_photo: { type: String }, 
    type: { 
        type: String, 
        enum: ['public', 'private', 'secret'], 
        required: true 
    },
    allow_member_posts: { type: Boolean, default: true }, 
    allow_member_events: { type: Boolean, default: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Group', GroupSchema);