import Job from "./Job";

import Navbar from "./shared/Navbar";
const random = [1,2,3,4,5,6,7,8,9];
function Browse() {
  return <div>
    <Navbar></Navbar>
    <div className="max-w-7xl mx-auto my-10">
    <h1>Search Results ({random.length})</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
    {
        random.map((item,index)=>{
            return (
                <Job></Job>
            )
        })
    }
    </div>

    </div>
  </div>;
}
export default Browse;
