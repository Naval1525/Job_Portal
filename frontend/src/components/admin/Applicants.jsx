// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import Navbar from "../shared/Navbar";
// import ApplicantsTable from "./ApplicantsTable";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllApplicants } from "@/redux/application";
// import { useEffect } from "react";
// import store from "@/redux/store";

// function Applicants() {
//   const{applicants} = useSelector(store=>store.application);
//   const params = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch applicants
//     const fetchAllApplicants = async () => {
//       try {
//         const res = await axios.get(
//           `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(res);
//         if (res.data.status) {
//           console.log(res.data.job);
//           dispatch(setAllApplicants(res.data.job));
//         }
//       } catch (err) {
//         console.error("Error fetching applicants:", err);
//       }
//     };

//     fetchAllApplicants();
//   }, [dispatch]); // Add params.id to dependency array to re-fetch if it changes

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="max-w-7xl mx-auto">
//         <h1 className="font-bold text-xl my-5">Applicants {applicants?.application?.length}</h1>
//         <ApplicantsTable></ApplicantsTable>
//       </div>
//     </div>
//   );
// }
// export default Applicants;
import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const params = useParams();

  useEffect(() => {
    // Fetch applicants
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        if (res.data.status) {
          setApplicants(res.data.job);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };

    fetchAllApplicants();
  }, [params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length || 0}
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
}

export default Applicants;
