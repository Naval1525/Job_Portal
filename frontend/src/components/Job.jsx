import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

function Job() {
  return (
    <div className="p-5 rounded-lg shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p>2 Days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark></Bookmark>
        </Button>
      </div>
      <div className="flex items-center gap-3 my-2">
        <Button>
          <Avatar>
            <AvatarImage src="data:image/png;base64,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"></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          hello guys paise chaiyeh to pehhle please susbs suuubs subscribe my
          channel
        </p>
      </div>
      <div className="flex space-x-2 mt-4">
        <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          12 Positions
        </div>
        <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
          Part Time
        </div>
        <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
          ₹24 LPA
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="px-3 py-1 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors ">
          Details
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-purple-900 transition-colors">
          Save For Later
        </button>
      </div>
    </div>
  );
}
export default Job;
