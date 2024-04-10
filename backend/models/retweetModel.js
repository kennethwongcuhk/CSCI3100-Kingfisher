const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const retweetSchema = new Schema({
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
},  { timestamps: true });

module.exports = mongoose.models.Retweet || mongoose.model('Retweet', retweetSchema);