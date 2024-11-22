import express from "express";
import {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controller.js";

import isAuth from "../middleware/isauth.js";

const router = express.Router();
router.post("/postJob", isAuth, postJob);
router.get("/get", isAuth, getAllJobs);
router.get("/getadminjobs", isAuth, getAdminJobs);
router.get("/get/:id", isAuth, getJobById);

export default router;
