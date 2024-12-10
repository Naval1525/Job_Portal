import { setAllJobs } from "@/redux/jobSlice";
import store from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function useGetAllJobs() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {

      try {
        // Use an empty string as default if no search query
        const queryParam = searchQuery ? `?keyword=${searchQuery}` : '';
        const res = await axios.get(`${JOB_API_END_POINT}/get${queryParam}`, {
          withCredentials: true,
        });

        dispatch(setAllJobs(res.data));
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);
      } finally {

      }
    };

    // Only fetch if there's a query or you want to show all jobs initially
    fetchAllJobs();
  }, [dispatch, searchQuery]);

  return { error };
}

export default useGetAllJobs;