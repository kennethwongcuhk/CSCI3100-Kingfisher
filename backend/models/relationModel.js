const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const relationSchema = new Schema({
    follower_user_id: {
        type: String,
        required: true,
    },
    follower_username: {
        type: String,
        required: true,
    },
    following_user_id: {
        type: String,
        required: true,
    },
    following_username: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Relation', relationSchema);
