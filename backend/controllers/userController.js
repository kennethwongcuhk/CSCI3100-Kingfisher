const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn:'1d' });
}

const loginUser = async (req, res) => {
    res.json({mssg: 'login user'});
}

const signupUser = async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const user = await User.signup(email, username, password);
        const token = createToken(user._id);
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginUser,
    signupUser,
}