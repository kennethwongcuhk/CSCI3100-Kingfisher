const User = require('../models/userModel');
const Relation = require('../models/relationModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn:'1d' });
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.status(200).json({username, user_id:(user._id), token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const {email, username, password, invite_code} = req.body;
    try {
        const user = await User.signup(email, username, password, invite_code);
        const token = createToken(user._id);
        res.status(200).json({username, user_id:(user._id), token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getAllUser = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id);
        if (!user.isAdmin) {
            return res.status(400).json({error: 'not admin.'});
        }
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getAllUserSearch = async (req, res) => {
    try {
        // const user_id = req.user._id;
        // const user = await User.findById(user_id);
        // if (!user.isAdmin) {
        //     return res.status(400).json({error: 'not admin.'});
        // }
        let users = (await User.find({}).sort({createdAt: -1}));
        // console.log(users);
        users = users.map(({username, _id}) => ({username, _id}));
        // console.log(users);
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUserInfo = async (req, res) => {
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
        const follower = await Relation.find({following_user_id:user_id}).countDocuments();
        const following = await Relation.find({follower_user_id:user_id}).countDocuments();
        // console.log(follower);
        // console.log(following);
        res.status(200).json({user_id, username, follower, following})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    if (user.isAdmin) {
        let target = await User.findById(id);
        if (!target) {
            return res.status(404).json({error: 'No such user'})
        }
        if (target.isAdmin) {
            return res.status(404).json({error: 'Cannot delete an admin'})
        }
        target = await User.findByIdAndDelete(id);
        res.status(200).json(target);
    } else {
        res.status(200).json({error: 'No permission'});
    }
}

module.exports = {
    loginUser,
    signupUser,
    getAllUser,
    getAllUserSearch,
    getUserInfo,
    deleteUser,
}