const express = require('express');
const {
    getTweets,
    getTweet,
    createTweet,
    deleteTweet,
} = require('../controllers/tweetController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getTweets);

router.get('/:id', getTweet);

router.post('/', createTweet);

router.delete('/:id', deleteTweet);

module.exports = router;