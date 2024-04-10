const express = require('express');
const {
    createComment,
    getTweetComments,
} = require('../controllers/commentController')

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/tweet/:id', getTweetComments);

router.post('/:id', createComment);

module.exports = router;