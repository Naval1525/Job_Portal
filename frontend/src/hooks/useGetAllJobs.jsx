import { setLoading } from "@/redux/authSlice";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetAllJobs() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      dispatch(setLoading(true)); // Dispatching the Redux action to set loading state
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("Full API Response:", res);
        console.log("Response Data:", res.data);
        console.log("Jobs in Response:", res.data.jobs);

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs)); // Update Redux state with fetched jobs
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

    fetchAllJobs();
  }, [dispatch]); // `dispatch` is a stable reference, safe to include in dependencies.

  return { error }; // Return error so consuming components can use it
}

export default useGetAllJobs;
