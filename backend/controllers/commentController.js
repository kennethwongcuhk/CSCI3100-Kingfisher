const Comment = require('../models/commentModel');
const Tweet = require('../models/TweetModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const createComment = async (req, res) => {
    const { id } = req.params;
    const {content} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const tweet = await Tweet.findById(id);
    if (!tweet) {
        return res.status(404).json({error: 'No such tweet'})
    }

    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);
        const username = user.username;
        const comment = await Comment.create({user_id, username, tweet:id, content});
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTweetComments = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const tweet = await Tweet.findById(id);
    if (!tweet) {
        return res.status(404).json({error: 'No such tweet'})
    }
    try {
        const comments = await Comment.find({tweet:id}).sort({createdAt: -1});
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createComment,
    getTweetComments,
}