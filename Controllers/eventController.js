const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Logique de billetterie (Bonus/Spécifications)
exports.addTicketType = async (req, res) => {
    try {
        const newTicket = new TicketType(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.buyTicket = async (req, res) => {
    try {
        const alreadyBought = await TicketPurchase.findOne({ 
            lastname: req.body.lastname, 
            firstname: req.body.firstname,
            ticket_type_id: req.body.ticket_type_id 
        });

        if (alreadyBought) {
            return res.status(403).json({ error: "Limite atteinte : Une seule place par personne autorisée." });
        }

        const purchase = new TicketPurchase(req.body);
        await purchase.save();
        res.status(201).json({ message: "Achat confirmé", purchase });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Créer un sondage
exports.createPoll = async (req, res) => {
    try {
        const poll = new Poll(req.body);
        await poll.save();
        res.status(201).json(poll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Voter
exports.voteInPoll = async (req, res) => {
    try {
        const { pollId, questionIndex, optionIndex, userId } = req.body;
        const poll = await Poll.findById(pollId);
        
        poll.questions[questionIndex].responses.push({
            user_id: userId,
            chosen_option_index: optionIndex
        });
        
        await poll.save();
        res.json({ message: "Vote enregistré" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};