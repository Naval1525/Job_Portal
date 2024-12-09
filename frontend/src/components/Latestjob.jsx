// import { useSelector } from "react-redux";
// import LatestjobCards from "./LatestjobCards";


// function Latestjob() {
//   const {allJobs} = useSelector(store=>store.job);
//     const randomJobs = [1,2,3,4,5,6,7,8];
//   return <div className="max-w-7xl mx-auto my-20">
//     <h1 className="text-3xl font-bold"><span className="text-blue-700">Latest</span> Job Openings</h1>
//     <div className="grid grid-cols-3  gap-4 my-5">
//       {allJobs.length<=0?<>No Job</>:allJobs.slice(0,6).map((job) => (
//         <LatestjobCards key={job._id} job = {job}></LatestjobCards>
//       ))}
//     </div>


//   </div>;
// }
// export default Latestjob;
import { useSelector } from "react-redux";
import LatestjobCards from "./LatestjobCards";

function Latestjob() {
  const { allJobs } = useSelector(store => store.job);
  console.log(allJobs)

  // Detailed logging to understand the data
  console.log('Raw allJobs:', allJobs);
  console.log('Type of allJobs:', typeof allJobs);
  console.log('Is Array:', Array.isArray(allJobs));

  // More defensive rendering
  // const jobsToDisplay = Array.isArray(allJobs) ? allJobs.slice(0, 6) :
  //                       allJobs && typeof allJobs === 'object' ? Object.values(allJobs).slice(0, 6) :
  //                       [];
  // const jobsToDisplay = Array.isArray(allJobs)
  //   ? allJobs.slice(0, 6)
  //   : allJobs && typeof allJobs === 'object'
  //     ? [allJobs].slice(0, 6)
  //     : [];


  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-3xl font-bold">
        <span className="text-blue-700">Latest</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length > 0 ? (
          allJobs.map((job) => (
            <LatestjobCards
              key={job._id || job.id}
              job={job}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No Jobs Available
            {/* Add more diagnostic information */}
            <p>Raw data length: {allJobs?.length}</p>
            <p>Raw data type: {typeof allJobs}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Latestjob;