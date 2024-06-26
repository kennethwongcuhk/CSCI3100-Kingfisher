const Reaction = require('../models/reactionModel');
const Tweet = require('../models/TweetModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const likeTweet = async (req, res) => {
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
        const reaction_exists = await Reaction.findOneAndUpdate({user_id, tweet:id}, {isLike:true}, {new:true});
        if (reaction_exists) {
            return res.status(200).json(reaction_exists);
        }
        const reaction = await Reaction.create({user_id, username, tweet:id, isLike:true});
        res.status(200).json(reaction)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const dislikeTweet = async (req, res) => {
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
        const reaction_exists = await Reaction.findOneAndUpdate({user_id, tweet:id}, {isLike:false}, {new:true});
        if (reaction_exists) {
            return res.status(200).json(reaction_exists);
        }
        const reaction = await Reaction.create({user_id, username, tweet:id, isLike:false});
        res.status(200).json(reaction)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    likeTweet,
    dislikeTweet,
}