import { setLoading } from "@/redux/authSlice";
import { setAllAdminjobs, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetAdminAllJobs() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      dispatch(setLoading(true)); // Dispatching the Redux action to set loading state
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs?timestamp=${new Date().getTime()}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setAllAdminjobs(res.data.jobs)); // Update Redux state with fetched jobs
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

    fetchAllAdminJobs();
  }, [dispatch]); // `dispatch` is a stable reference, safe to include in dependencies.

// Return error so consuming components can use it
}

export default useGetAdminAllJobs;

