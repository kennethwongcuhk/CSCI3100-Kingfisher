const Tweet = require('../models/TweetModel');
const User = require('../models/userModel');
const Relation = require('../models/relationModel');
const Reaction = require('../models/reactionModel');
const Retweet = require('../models/retweetModel');
const Comment = require('../models/commentModel');
const mongoose = require('mongoose');

const getTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({}).sort({createdAt: -1});
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getRecommendedTweets = async (req, res) => {
    try {
        const user_id = req.user._id;
        const following = (await Relation.find({follower_user_id:user_id})
            .select({following_user_id:1, _id:0}))
            .map(obj => obj.following_user_id);
        let tweets = await Tweet.find({}).sort({createdAt: -1});
        const user = await User.findById(user_id);
        // console.log(following);
        // console.log(tweets);
        if (!user.isAdmin) {
            tweets = tweets.filter(tweet => following.includes(tweet.user_id) || tweet.user_id == user_id);
        }
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
    const likes = await Reaction.find({tweet:id, isLike:true}).countDocuments();
    const dislikes = await Reaction.find({tweet:id, isLike:false}).countDocuments();
    const retweets = await Retweet.find({tweet:id}).countDocuments();
    const comments = await Comment.find({tweet:id}).countDocuments();
    res.status(404).json({tweet, likes, dislikes, retweets, comments});
}

const getUserTweets = async (req, res) => {
    const { id } = req.params;
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
        user = await User.findById(id);
    } else {
        user = await User.findOne({username:id});
    }
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    try {
        const tweets = await Tweet.find({username:id}).sort({createdAt: -1});
        res.status(200).json(tweets);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createTweet = async (req, res) => {
    const {content} = req.body;
    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);
        const username = user.username
        const tweet = await Tweet.create({content, user_id, username});
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
    getRecommendedTweets,
    getTweet,
    getUserTweets,
    createTweet,
    deleteTweet,
}