import React from "react";
import { Briefcase, MapPin, DollarSign, BookmarkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const today = new Date();
    const jobDate = new Date(mongodbTime);

    // Normalize both dates to midnight to ignore the time part
    today.setHours(0, 0, 0, 0);
    jobDate.setHours(0, 0, 0, 0);

    const diffTime = today - jobDate; // Time difference in milliseconds
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert to days

    return Math.floor(diffDays); // Return the number of days ago
  };

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-6
      transition duration-300 hover:shadow-lg hover:border-blue-100
      relative group"
    >
      {/* Bookmark Icon */}
      <div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100
        transition duration-300"
      >
        <BookmarkIcon
          className="w-6 h-6 text-gray-400 hover:text-blue-600
          cursor-pointer"
        />
      </div>

      {/* Company Logo Placeholder */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <Avatar>
            <AvatarImage
              className="w-5"
              src={job?.company?.logo || "https://via.placeholder.com/150"}
              alt="Company Logo"
            />
          </Avatar>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {job?.company?.name || "Company Name"}
          </h2>
          <p className="text-gray-500 text-sm">
            {daysAgoFunction(job?.createdAt) <= 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-700">
          {job?.title || "Job Title"}
        </h1>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {job?.description || "Job description details..."}
        </p>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-xs text-gray-600">
            {job?.location || "Remote"}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-500" />
          <span className="text-xs text-gray-600">
            {job?.salary || "80-100"}K
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
          <Briefcase className="w-5 h-5 text-purple-500" />
          <span className="text-xs text-gray-600">
            {job?.jobType || "Full-time"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className=" mt-3">
        <button
          className="bg-white text-black border border-black-1px px-4 py-2 rounded-full mr-3
          text-sm"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Description
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full
          text-sm hover:bg-blue-700 transition"
        >
          Save for later
        </button>
      </div>
    </div>
  );
}

export default Job;
