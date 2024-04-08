const express = require('express');
const {
    likeTweet,
    dislikeTweet,
} = require('../controllers/reactionController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/like/:id', likeTweet);

router.post('/dislike/:id', dislikeTweet);

module.exports = router;