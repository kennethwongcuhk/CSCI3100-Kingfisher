const express = require('express');
const {
    followUser,
    unfollowUser,
} = require('../controllers/relationController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/follow/:id', followUser);

router.post('/unfollow/:id', unfollowUser);

module.exports = router;