import { setLoading } from "@/redux/authSlice";
import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetSingleJob({jobId}) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      dispatch(setLoading(true)); // Dispatching the Redux action to set loading state
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });


        if (res.data.status) {
          dispatch(setSingleJob(res.data)); // Update Redux state with fetched jobs
          setError(null); // Clear any previous errors
        } else {
          setError(new Error("Failed to fetch jobs. Status not true."));
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);
      } finally {
        dispatch(setLoading(false)); // Dispatching the Redux action to unset loading state
      }
    };

    fetchSingleJob();
  }, [dispatch]); // `dispatch` is a stable reference, safe to include in dependencies.

  return { error }; // Return error so consuming components can use it
}

export default useGetSingleJob;
