import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Briefcase, CheckCircle2, Clock } from "lucide-react";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJobs";
import { setLoading } from "@/redux/authSlice";
import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";

function JobDescription() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?.id || false
  );
const [isApplied,setIsApplied]= useState(isInitiallyApplied);
  const applyJobHandler = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      console.log("Apply Job Response:", res);
      if (res.data.status) {
        toast.success(res.data.messaage||"Applied Successfully");
        setIsApplied(true);
        const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob));
        setError(null);
      }
    } catch (err) {
      toast.error("Already Applied");
      console.error("Error applying for job:", err);
      setError(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      dispatch(setLoading(true)); // Dispatching the Redux action to set loading state
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        // console.log("Full API Response:", res);
        // console.log("Response Data:", res.data);
        // console.log("Jobs in Response:", res.data.job);

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job)); // Update Redux state with fetched jobs
          setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id));//ensure the state is in sync
          setError(null); // Clear any previous errors
        } else {
          setError(new Error("Failed to fetch jobs. Status not true."));
        }
      } catch (err) {
        toast.error(res.error.messaage);
        console.error("Error fetching jobs:", err);
        setError(err);
      } finally {
        dispatch(setLoading(false)); // Dispatching the Redux action to unset loading state
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto my-14 px-6">
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 relative">
          {/* Apply Button at Top-Right */}
          {!isApplied ? (
            <Button
              onClick={isApplied?null:applyJobHandler}
              className="absolute top-6 right-6 bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700 transition "
            >
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
              {singleJob?.title}
            </h1>
          </div>

          {/* Job Details */}
          <div className="flex items-center gap-4 mt-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              {singleJob?.position} Postion
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              {singleJob?.jobType}
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {singleJob?.salary}LPA
            </div>
          </div>

          {/* Job Description */}
          <h1 className="border-b-2 border-gray-200 font-semibold py-4 text-lg">
            {singleJob?.description}
          </h1>
          <div className="my-4 text-gray-700 space-y-4">
            <p>
              <strong className="font-medium">Role:</strong>{" "}
              <span>{singleJob?.title}</span>
            </p>
            <p>
              <strong className="font-medium">Location:</strong>{" "}
              <span>{singleJob?.location}</span>
            </p>
            <p>
              <strong className="font-medium">Description:</strong>{" "}
              <span>{singleJob?.description}</span>
            </p>
            <p>
              <strong className="font-medium">Experience:</strong>{" "}
              <span>{singleJob?.experience}</span>
            </p>
            <p>
              <strong className="font-medium">Salary:</strong>{" "}
              <span>{singleJob?.salary}LPA</span>
            </p>
            <p>
              <strong className="font-medium">Total Applicants:</strong>{" "}
              <span>{singleJob?.applications?.length}</span>
            </p>
            <p>
              <strong className="font-medium">Posted Date:</strong>{" "}
              <span>{singleJob?.createdAt.split("T")[0]}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;