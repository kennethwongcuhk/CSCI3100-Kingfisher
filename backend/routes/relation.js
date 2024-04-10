const express = require('express');
const {
    followUser,
    unfollowUser,
    getFollower,
    getFollowing,
} = require('../controllers/relationController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/follow/:id', followUser);

router.post('/unfollow/:id', unfollowUser);

router.get('/follower/:id', getFollower);

router.get('/following/:id', getFollowing);

module.exports = router;