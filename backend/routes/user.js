const express = require('express');
const {
    loginUser,
    signupUser,
    getUserInfo,
} = require('../controllers/userController')

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/info/:id', getUserInfo);

module.exports = router;