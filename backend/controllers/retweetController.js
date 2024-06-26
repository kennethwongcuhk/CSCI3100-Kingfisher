const Retweet = require('../models/retweetModel');
const Tweet = require('../models/TweetModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const createRetweet = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const target = await Tweet.findById(id);
    if (!target) {
        return res.status(404).json({error: 'No such tweet'})
    }

    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);
        const username = user.username;
        const retweet_exists = await Retweet.findOne({user_id, tweet:id});
        if (retweet_exists) {
            return res.status(400).json({error: 'Retweeted already'});
        }
        const retweet = await Retweet.create({user_id, username, tweet:id});
        res.status(200).json(retweet)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteRetweet = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const target = await Tweet.findById(id);
    if (!target) {
        return res.status(404).json({error: 'No such tweet'})
    }

    try {
        const user_id = req.user._id;
        const retweet = await Retweet.findOneAndDelete({user_id, tweet:id});
        if (!retweet) {
            return res.status(400).json({error: 'Never retweeted'});
        }
        res.status(200).json(retweet)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createRetweet,
    deleteRetweet,
}