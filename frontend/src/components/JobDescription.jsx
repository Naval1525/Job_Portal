import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Briefcase, CheckCircle2, Clock } from "lucide-react";
import Navbar from "./shared/Navbar";

function JobDescription() {
  const isApplied = false;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto my-14 px-6">
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 relative">
          {/* Apply Button at Top-Right */}
          {!isApplied ? (
            <Button className="absolute top-6 right-6 bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700 transition ">
              Apply Now
              <span className="ml-2">→</span>
            </Button>
          ) : (
            <div className="absolute top-6 right-6 text-green-600 font-medium flex items-center">
              <CheckCircle2 className="mr-2 w-5 h-5" />
              Applied
            </div>
          )}

          {/* Job Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="font-extrabold text-3xl text-gray-900">
              Front-End Developer
            </h1>
          </div>

          {/* Job Details */}
          <div className="flex items-center gap-4 mt-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              12 Positions
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              Part Time
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              ₹ 24 LPA
            </div>
          </div>

          {/* Job Description */}
          <h1 className="border-b-2 border-gray-200 font-semibold py-4 text-lg">
            Job Description
          </h1>
          <div className="my-4 text-gray-700 space-y-4">
            <p>
              <strong className="font-medium">Role:</strong> <span>Frontend Developer</span>
            </p>
            <p>
              <strong className="font-medium">Location:</strong> <span>Delhi</span>
            </p>
            <p>
              <strong className="font-medium">Description:</strong>{" "}
              <span>Required a Frontend Developer who can work passionately.</span>
            </p>
            <p>
              <strong className="font-medium">Experience:</strong> <span>2 years</span>
            </p>
            <p>
              <strong className="font-medium">Salary:</strong> <span>12 LPA</span>
            </p>
            <p>
              <strong className="font-medium">Total Applicants:</strong> <span>4</span>
            </p>
            <p>
              <strong className="font-medium">Posted Date:</strong>{" "}
              <span>07-12-2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
