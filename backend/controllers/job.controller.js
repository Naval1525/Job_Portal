import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      position,
      experience,
      companyId,
      salary,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId ||
      !salary
    ) {
      return res.status(400).json({
        error: "All fields are required",
        status: false,
      });
    }
    const job = new Job({
      title,
      description,
      requirements: requirements.split(","),
      location,
      jobType,
      position,
      experience,
      company: companyId,
      salary: Number(salary),
      created_by: userId,
    });
    await job.save();
    return res.status(201).json({
      message: "Job posted successfully",
      status: true,
      job,
    });
  } catch (err) {
    console.error("Job posting error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    // const jobs = await Job.find(query);
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(400).json({
        error: "Jobs not found",
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      jobs,
    });
  } catch (err) {
    console.error("Get jobs error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;  // Correct way to get the ID from route params
    const job = await Job.findById(jobId).populate({
      path:"applications"

  });
    if (!job) {
      return res.status(404).json({  // Changed to 404 for "Not Found"
        error: "Job not found",
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      job,
    });
  } catch (err) {
    console.error("Get job by id error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

//admin kitne job create kra hai abhi tak
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(400).json({
        error: "Jobs not found",
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      jobs,
    });
  } catch (err) {
    console.error("Get admin jobs error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
