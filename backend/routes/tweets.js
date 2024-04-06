const express = require('express');
const {
    getTweets,
    getTweet,
    createTweet,
} = require('../controllers/tweetController')

const router = express.Router();

router.get('/', getTweets);

router.get('/:id', getTweet);

router.post('/', createTweet);

router.delete('/', (req, res) => {
    res.json({mssg: 'delete tweet'});
});

module.exports = router;