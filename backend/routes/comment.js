const express = require('express');
const {
    createComment,
} = require('../controllers/commentController')

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/:id', createComment);

module.exports = router;