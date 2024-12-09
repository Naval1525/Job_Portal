import { setLoading } from "@/redux/authSlice";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useGetCompanyById(companyId) {
  console.log("get companyId", companyId);  // Log companyId passed to the hook

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) {
      console.warn("Invalid company ID:", companyId);  // Specific warning
      return;
    }

    const fetchSingleCompany = async () => {
      dispatch(setLoading(true));
      try {
        console.log("Fetching company with ID:", companyId);
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });

        console.log("API response:", res.data);  // Log the full response

        if (res.data.status && res.data.data) {
          console.log("Fetched company:", res.data.data);  // Log the company data
          dispatch(setSingleCompany(res.data.data));  // Use res.data.data instead of res.data.company
        } else {
          console.error("Failed to fetch company, no company data in response");
          setError(new Error("Failed to fetch company"));
        }
      } catch (err) {
        console.error("Error fetching company:", err);
        setError(err);
      } finally {
        dispatch(setLoading(false));
      }
    };


    fetchSingleCompany();
  }, [companyId, dispatch]);  // Dependency array to rerun when companyId changes

  return { error };
}

export default useGetCompanyById;