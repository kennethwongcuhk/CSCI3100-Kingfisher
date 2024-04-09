const express = require('express');
const {
    getTweets,
    getRecommendedTweets,
    getTweet,
    getUserTweets,
    createTweet,
    deleteTweet,
} = require('../controllers/tweetController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getTweets);

router.get('/recommended', getRecommendedTweets);

router.get('/:id', getTweet);

router.get('/user/:id', getUserTweets);

router.post('/', createTweet);

router.delete('/:id', deleteTweet);

module.exports = router;