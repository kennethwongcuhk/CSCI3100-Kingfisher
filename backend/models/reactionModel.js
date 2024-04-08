const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    reactor: {
        type: String,
        required: true,
    },
    tweet: {
        type: String,
        required: true,
    },
    isLike: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Reaction', reactionSchema);