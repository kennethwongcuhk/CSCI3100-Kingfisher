const express = require('express');
const {
    createRetweet,
    deleteRetweet,
} = require('../controllers/retweetController')

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/:id', createRetweet);

router.delete('/:id', deleteRetweet);

module.exports = router;