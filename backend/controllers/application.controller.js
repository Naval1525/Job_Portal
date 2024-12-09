import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;

    // Validate job ID format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        error: "Invalid job ID format",
        status: false,
      });
    }

    // Find the job first
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
        jobId: jobId,
        status: false,
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        error: "Application already exists",
        status: false,
      });
    }

    const application = new Application({
      job: jobId,
      applicant: userId,
    });

    await application.save();

    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      status: true,
      application,
    });
  } catch (err) {
    console.error("Apply job error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(400).json({
        error: "Applications not found",
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      applications,
    });
  } catch (err) {
    console.error("Get applications error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id; // Access the jobId from the route parameter
    console.log('Job ID:', jobId); // This should log the correct jobId

    // Check if the jobId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        error: "Invalid job ID format",
        status: false,
      });
    }

    // Find the job by jobId and populate applications and applicants
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(400).json({
        error: "Job not found",
        status: false,
      });
    }

    return res.status(200).json({
      status: true,
      job,
    });
  } catch (err) {
    console.error("Get application error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        error: "status is required",
        status: false,
      });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        error: "Application not found",
        status: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      status: true,
      message: "status updated successfully",
      application,
    });
  } catch (err) {
    console.error("Update application error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
