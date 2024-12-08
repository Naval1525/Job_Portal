import React from 'react';

function LatestJobCards({job}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{job?.company?.name}</h2>
          <p className="text-gray-500 text-sm">{}</p>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-700">{job?.title}</h1>
        <p className="text-gray-600 text-sm mt-1">
        {job?.description}
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
        {job?.position}
        </div>
        <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
        {job?.jobType}
        </div>
        <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
        {job?.salary}LPA
        </div>
      </div>
    </div>
  );
}

export default LatestJobCards;