import { Search } from "lucide-react";
import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div>
      <div className="text-center ">
        <div className="flex flex-col gap-5 my-14 ">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-zinc-800  font-bold shadow-sm">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">Search,  Apply & <br></br> Get Your <span className="text-blue-700">Dream Job</span></h1>
        <p className="">lena hai lai nhi toh muh mai deduga choco</p>
        <div className="flex w-[40% shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input type="text" placeholder="Find your dream jobs" className="outline-none border-none w-full">

            </input>
            <Button className="rounded-r-full bg-blue-700"><Search className="h-5 w-5"></Search></Button>
        </div>
      </div>
      </div>
    </div>
  );
}
export default HeroSection;
