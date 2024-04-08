const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const retweetSchema = new Schema({
    retweeter: {
        type: String,
        required: true,
    },
    tweet: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Retweet', retweetSchema);