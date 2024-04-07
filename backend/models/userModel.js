const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

userSchema.statics.signup = async function(email, username, password) {
    const email_exists = await this.findOne({ email });
    if (email_exists) {
        throw Error('Email already in use.');
    }
    const username_exists = await this.findOne({ username });
    if (username_exists) {
        throw Error('Username already in use.');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, username, password: hash });

    return user;
}

module.exports = mongoose.model('User', userSchema);