import LatestjobCards from "./LatestjobCards";


function Latestjob() {
    const randomJobs = [1,2,3,4,5,6,7,8];
  return <div className="max-w-7xl mx-auto my-20">
    <h1 className="text-3xl font-bold"><span className="text-blue-700">Latest</span> Job Openings</h1>
    <div className="grid grid-cols-3  gap-4 my-5">
      {randomJobs.slice(0,6).map((job) => (
        <LatestjobCards key={job}></LatestjobCards>
      ))}
    </div>


  </div>;
}
export default Latestjob;
