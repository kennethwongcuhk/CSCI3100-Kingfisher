const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    username: {
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
}, { timestamps:true });

module.exports = mongoose.model('Reaction', reactionSchema);