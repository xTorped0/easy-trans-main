import express from 'express';
import { getUserById, getUsers, postUser, deleteUser } from '../controllers/user.mjs';

const router = express.Router();

router.get('/all', getUsers);
router.post('/user', postUser);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUser);

export const userRoutes = router;
