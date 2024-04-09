const User = require('../models/userModel');
const Relation = require('../models/relationModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn:'1d' });
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {
    const {email, username, password, invite_code} = req.body;
    try {
        const user = await User.signup(email, username, password, invite_code);
        const token = createToken(user._id);
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        const username = user.username;
        const follower = await Relation.find({following:id}).countDocuments();
        const following = await Relation.find({follower:id}).countDocuments();
        console.log(follower);
        res.status(200).json({username, id, follower, following})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginUser,
    signupUser,
    getUserInfo,
}