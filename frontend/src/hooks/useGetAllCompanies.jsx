import { setLoading } from "@/redux/authSlice";
import { setAllCompanies } from "@/redux/companySlice";

import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetAllCompany() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      dispatch(setLoading(true)); // Dispatching the Redux action to set loading state
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });


        if (res.data.status) {
          dispatch(setAllCompanies(res.data.companies)); // Update Redux state with fetched jobs
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

    fetchAllCompany();
  }, [dispatch]); // `dispatch` is a stable reference, safe to include in dependencies.

  return { error }; // Return error so consuming components can use it
}

export default useGetAllCompany;
