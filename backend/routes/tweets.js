const express = require('express');
const {
    getTweets,
    getTweet,
    createTweet,
    deleteTweet,
} = require('../controllers/tweetController')

const router = express.Router();

router.get('/', getTweets);

router.get('/:id', getTweet);

router.post('/', createTweet);

router.delete('/:id', deleteTweet);

module.exports = router;