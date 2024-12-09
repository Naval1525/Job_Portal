import { APPLICATION_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/application";
import { useEffect, useState } from "react";
import store from "@/redux/store";

function Applicants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { applicants } = useSelector(store => store.application);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.status) {
          console.log(res.data.job)
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  if (loading) return <div>Loading applicants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable
          applicants={applicants?.applications || []}
          jobDetails={applicants}
        />
      </div>
    </div>
  );
}
export default Applicants;
