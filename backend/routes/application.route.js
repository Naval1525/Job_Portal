import express from 'express';

import isAuth from '../middleware/isauth.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';


const router = express.Router();

router.get("/apply/:id",isAuth,applyJob);
router.get('/get',isAuth,getAppliedJobs);
router.get('/:id/applicants',isAuth,getApplicants);
router.post('/status/:id/update',isAuth,updateStatus);

export default router;