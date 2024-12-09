import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  // Initialize filtered jobs with all jobs when the data is fetched
  useEffect(() => {
    if (allAdminJobs && Array.isArray(allAdminJobs)) {
      setFilterJobs(allAdminJobs);
    }
  }, [allAdminJobs]);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allAdminJobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm)
    );
    setFilterJobs(filtered);
  };

  // Format date to make it more readable
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded px-3 py-2 w-full"
          onChange={handleFilter}
        />
      </div>

      {/* Table */}
      <Table>
        <TableCaption>A list of your recently posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{formatDate(job?.createdAt)}</TableCell>
                <TableCell>{job.salary || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex flex-col bg-gray-800 text-white rounded-2xl px-4 py-2 shadow-lg">
                      <div className="space-y-2">
                        <div
                          onClick={() => navigate(`/admin/companies/${job._id}`)}
                          className="flex items-center gap-2 py-2 cursor-pointer hover:underline"
                        >
                          <Edit2 className="w-4" />
                          <span className="text-sm">Edit</span>
                        </div>
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 py-2 cursor-pointer hover:underline"
                        >
                          <Eye className="w-4" />
                          <span className="text-sm">Applicants</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
