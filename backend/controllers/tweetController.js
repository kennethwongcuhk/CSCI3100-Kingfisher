const Tweet = require('../models/TweetModel');

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
    const tweet = await Tweet.findById(id);
    if (!tweet) {
        return res.status(404).json({error: 'No such tweet'})
    }
    res.status(404).json(tweet);
}

const createTweet = async (req, res) => {
    const {content} = req.body;
    try {
        const tweet = await Tweet.create({content});
        res.status(200).json(tweet)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTweets,
    getTweet,
    createTweet,
}