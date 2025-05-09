import express from 'express';
import { 
    getAllUsers,
    getUserById,
    createUser,
    authUser
} from '../controllers/userController.js';

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.get('/:id', getUserById);

router.post('/login', authUser);

export default router;