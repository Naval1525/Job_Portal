import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { setSearchQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Browse() {
    const dispatch = useDispatch();
    const { allJobs, searchQuery } = useSelector((store) => store.job);
    const { error } = useGetAllJobs();

    // Clear search query when component unmounts
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        };
    }, [dispatch]);

    // Filtering jobs based on search query
    const filteredJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                        {searchQuery
                            ? `Search Results for "${searchQuery}"`
                            : "All Jobs"}
                        <span className="text-gray-500 text-xl ml-3">
                            ({filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'})
                        </span>
                    </h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <Job job={job} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-100 rounded-lg">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-xl text-gray-600">
                                No jobs found matching your search.
                            </p>
                            <p className="text-gray-500 mt-2">
                                Try adjusting your search terms or filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Browse;