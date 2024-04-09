const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
});

userSchema.statics.signup = async function(email, username, password, invite_code) {
    if (!email || !username || !password || !invite_code) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    const email_exists = await this.findOne({ email });
    if (email_exists) {
        throw Error('Email already in use.');
    }
    const username_exists = await this.findOne({ username });
    if (username_exists) {
        throw Error('Username already in use.');
    }
    if (invite_code !== process.env.INVITE_NORMAL && invite_code !== process.env.INVITE_ADMIN) {
        throw Error('Incorrect invite code.');
    }
    const isAdmin = invite_code === process.env.INVITE_ADMIN
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, username, password: hash, isAdmin});

    return user;
}

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ username });
    if (!user) {
        throw Error('User does not exist');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);