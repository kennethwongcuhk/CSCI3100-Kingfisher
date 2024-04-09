const Relation = require('../models/relationModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const followUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const target = await User.findById(id);
    if (!target) {
        return res.status(404).json({error: 'No such user'})
    }

    try {
        const follower = req.user._id;
        if (follower == id) {
            return res.status(400).json({error: 'Cannot follow yourself'});
        }
        const relation_exists = await Relation.findOne({follower, following:id});
        if (relation_exists) {
            return res.status(400).json({error: 'Following already'});
        }
        const relation = await Relation.create({follower, following:id});
        res.status(200).json(relation)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const unfollowUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const target = await User.findById(id);
    if (!target) {
        return res.status(404).json({error: 'No such user'})
    }
    
    try {
        const follower = req.user._id;
        if (follower == id) {
            return res.status(400).json({error: 'Cannot unfollow yourself'});
        }
        const relation = await Relation.findOneAndDelete({follower, following:id});
        if (!relation) {
            return res.status(400).json({error: 'Not following'});
        }
        res.status(200).json(relation)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    followUser,
    unfollowUser,
}