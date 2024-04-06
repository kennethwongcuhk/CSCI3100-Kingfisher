const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({mssg: 'all tweets'});
});

router.get('/:id', (req, res) => {
    res.json({mssg: 'one tweet'});
});

router.post('/', (req, res) => {
    res.json({mssg: 'post new tweet'});
});

router.delete('/', (req, res) => {
    res.json({mssg: 'delete tweet'});
});

module.exports = router;