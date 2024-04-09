const Tweet = require('../models/TweetModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const getTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({}).sort({createdAt: -1});
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTweet = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const tweet = await Tweet.findById(id);
    if (!tweet) {
        return res.status(404).json({error: 'No such tweet'})
    }
    res.status(404).json(tweet);
}

const createTweet = async (req, res) => {
    const {content} = req.body;
    try {
        const user_id = req.user._id;
        const tweet = await Tweet.create({content, user_id});
        res.status(200).json(tweet)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteTweet = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    if (user.isAdmin) {
        const tweet = await Tweet.findByIdAndDelete(id);
        if (!tweet) {
            return res.status(404).json({error: 'No such tweet'})
        }
        res.status(200).json(tweet);
    } else {
        const tweet = await Tweet.findOneAndDelete({_id:id, user_id});
        if (!tweet) {
            return res.status(404).json({error: 'No such tweet'})
        }
        res.status(200).json(tweet);
    }
    
    
}

module.exports = {
    getTweets,
    getTweet,
    createTweet,
    deleteTweet,
}