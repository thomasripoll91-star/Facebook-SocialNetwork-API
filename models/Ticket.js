const mongoose = require('mongoose');

const TicketTypeSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const TicketPurchaseSchema = new mongoose.Schema({
    ticket_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    purchase_date: { type: Date, default: Date.now }
});

module.exports = {
    TicketType: mongoose.model('TicketType', TicketTypeSchema),
    TicketPurchase: mongoose.model('TicketPurchase', TicketPurchaseSchema)
};