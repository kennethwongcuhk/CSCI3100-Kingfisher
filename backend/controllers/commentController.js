const Comment = require('../models/commentModel');
const Tweet = require('../models/TweetModel');
const mongoose = require('mongoose');

const createComment = async (req, res) => {
    const { id } = req.params;
    const {content} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such tweet'})
    }
    const target = await Tweet.findById(id);
    if (!target) {
        return res.status(404).json({error: 'No such tweet'})
    }

    try {
        const commentor = req.user._id;
        const comment = await Comment.create({commentor, tweet:id, content});
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createComment,
}