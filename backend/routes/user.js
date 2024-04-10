const express = require('express');
const {
    loginUser,
    signupUser,
    getAllUser,
    getUserInfo,
    deleteUser,
} = require('../controllers/userController')

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', getAllUser);

router.get('/info/:id', getUserInfo);

router.delete('/:id', deleteUser);

module.exports = router;