import express from 'express';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import isAuth from '../middleware/isauth.js';
import { singleUpload} from '../middleware/multer.js';

const router = express.Router();

router.post('/register',singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/update', isAuth, updateProfile);

export default router;
