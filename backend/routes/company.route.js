import express from 'express';
import { registerCompany,getCompany, getCompanyById, updateCompany} from '../controllers/company.controller.js';
import isAuth from '../middleware/isauth.js';
import { singleUpload } from '../middleware/multer.js';


const router = express.Router();

router.post('/register',isAuth, registerCompany);
router.get('/get',isAuth,getCompany);
router.get('/get/:id',isAuth,getCompanyById);
router.put('/update/:id',isAuth,singleUpload,updateCompany);

export default router;