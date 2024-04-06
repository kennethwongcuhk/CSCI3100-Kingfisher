const express = require('express');
const Tweet = require('../models/TweetModel')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({mssg: 'all tweets'});
});

router.get('/:id', (req, res) => {
    res.json({mssg: 'one tweet'});
});

router.post('/', async (req, res) => {
    const {content} = req.body;
    try {
        const tweet = await Tweet.create({content});
        res.status(200).json(tweet)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.delete('/', (req, res) => {
    res.json({mssg: 'delete tweet'});
});

module.exports = router;