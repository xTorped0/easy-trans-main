const express = require('express');
const { getUserById, getUsers, postUser, deleteUser } = require('../controllers/user.js');

const router = express.Router();

router.get('/all', getUsers);
router.post('/user', postUser);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUser);

module.exports = router;