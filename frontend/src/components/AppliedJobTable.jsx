import React, { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

// Status Badge Component
const StatusBadge = ({ children, status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`
        px-2.5 py-0.5
        rounded-full
        text-xs
        font-medium
        border
        ${getStatusStyle(status)}
      `}
    >
      {children}
    </span>
  );
};

function AppliedJobTable() {
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get`,
          { withCredentials: true }
        );

        if (res.data.status) {
          const jobs = res?.data?.applications?.map((application) => ({
            id: application?._id, // Add unique key
            date: new Date(application?.createdAt).toLocaleDateString(),
            role: application?.job.title,
            company: application?.job.company?.name || "Unknown",
            status: application?.status,
          }));
          setAllAppliedJobs(jobs);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (isLoading) {
    return <div>Loading applied jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your applied jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs?.length > 0 ? (
          allAppliedJobs?.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                <StatusBadge status={job.status}>
                  {job.status}
                </StatusBadge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4" className="text-center">
              No applied jobs found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AppliedJobTable;