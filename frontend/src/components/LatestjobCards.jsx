import React from 'react';

function LatestJobCards() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Tech Innovations Inc.</h2>
          <p className="text-gray-500 text-sm">Bangalore, India</p>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-700">Senior Software Engineer</h1>
        <p className="text-gray-600 text-sm mt-1">
          Seeking an experienced developer to lead innovative projects in cloud infrastructure and scalable system design.
        </p>
      </div>

      <div className="flex space-x-2">
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
    </div>
  );
}

export default LatestJobCards;