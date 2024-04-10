const Relation = require('../models/relationModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const followUser = async (req, res) => {
    const { id } = req.params;
    let following_user;
    if (mongoose.Types.ObjectId.isValid(id)) {
        following_user = await User.findById(id);
    } else {
        following_user = await User.findOne({username:id});
    }
    if (!following_user) {
        return res.status(404).json({error: 'No such user'})
    }
    // console.log('user', following_user);

    try {
        const follower_user_id = req.user._id;
        if (String(follower_user_id) == String(following_user._id)) {
            return res.status(400).json({error: 'Cannot follow yourself'});
        }
        const relation_exists = await Relation.findOne({follower_user_id, following_user_id:following_user._id});
        if (relation_exists) {
            return res.status(400).json({error: 'Following already'});
        }
        const follower_user = await User.findById(follower_user_id);
        const follower_username = follower_user.username;
        const relation = await Relation.create({follower_user_id, follower_username, following_user_id:following_user._id, following_username:following_user.username});
        res.status(200).json(relation)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const unfollowUser = async (req, res) => {
    const { id } = req.params;
    let following_user;
    if (mongoose.Types.ObjectId.isValid(id)) {
        following_user = await User.findById(id);
    } else {
        following_user = await User.findOne({username:id});
    }
    if (!following_user) {
        return res.status(404).json({error: 'No such user'})
    }
    
    try {
        const follower_user_id = req.user._id;
        if (String(follower_user_id) == String(following_user._id)) {
            return res.status(400).json({error: 'Cannot unfollow yourself'});
        }
        const relation = await Relation.findOneAndDelete({follower_user_id, following_user_id:following_user._id});
        if (!relation) {
            return res.status(400).json({error: 'Not following'});
        }
        res.status(200).json(relation)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getFollower = async (req, res) => {
    const { id } = req.params;
    try {
        let user;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            user = await User.findOne({username: id});
        } else {
            user = await User.findOne({_id: id});
        }
        const user_id = user._id;
        const username = user.username;
        let follower = await Relation.find({following_user_id:user_id});
        follower = follower.map(obj => {return {
                user_id:(obj.follower_user_id),
                username :(obj.follower_username),
            }
        });
        res.status(200).json(follower);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getFollowing = async (req, res) => {
    const { id } = req.params;
    try {
        let user;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            user = await User.findOne({username: id});
        } else {
            user = await User.findOne({_id: id});
        }
        const user_id = user._id;
        const username = user.username;
        let following = await Relation.find({follower_user_id:user_id});
        following = following.map(obj => {return {
                user_id:(obj.following_user_id),
                username :(obj.following_username),
            }
        });
        res.status(200).json(following);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollower,
    getFollowing,
}