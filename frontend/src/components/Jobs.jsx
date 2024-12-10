import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Jobs() {
  // const { allJobs } = useSelector((store) => store.job); // Accessing the Redux store
  const { error } = useGetAllJobs(); // Fetch jobs when component loads
  const { allJobs, searchQuery, jobFilters } = useSelector(
    (store) => store.job
  );

  const filteredJobs = allJobs?.filter((job) => {
    const matchesSearch =
      job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      job?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesLocation =
      !jobFilters?.location ||
      job?.location?.toLowerCase() === jobFilters?.location?.toLowerCase();

    const matchesIndustry =
      !jobFilters?.industry ||
      job?.industry?.toLowerCase() === jobFilters?.industry?.toLowerCase();

    const matchesSalary =
      !jobFilters?.salary || checkSalaryRange(job?.salary, jobFilters?.salary);

    return matchesSearch && matchesLocation && matchesIndustry && matchesSalary;
  });


  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* FilterCard Section */}
          <div className="w-1/5">
            <FilterCard></FilterCard>
            {/* <FilterCard /> */}
          </div>

          {/* Jobs Section */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {error ? (
              <span>Error: {error.message}</span>
            ) : filteredJobs.length <= 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
