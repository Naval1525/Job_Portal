// import { Badge } from "./ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";

// function AppliedJobTable() {
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your appplied jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead className="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {[1, 2, 3, 4].map((itme, index) => {
//             return (
//               <TableRow key={index}>
//                 <TableCell>12-12-2021</TableCell>
//                 <TableCell>Software Developer</TableCell>
//                 <TableCell>Google</TableCell>
//                 <TableCell>

//                   <div className="bg-green-300 text-black px-3 py-1 rounded-full text-xs font-medium text-right">
//                     Selected
//                   </div>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
// export default AppliedJobTable;
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

// Custom Status Badge Component
const StatusBadge = ({ children, status }) => {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`
        px-2.5 py-0.5
        rounded-full
        text-xs
        font-medium
        border
        ${getStatusStyle(status)}
      `}
    >
      {children}
    </span>
  );
};

function AppliedJobTable() {
  // Sample job application data
  const jobApplications = [
    {
      date: '12-12-2021',
      role: 'Software Developer',
      company: 'Google',
      status: 'Selected'
    },
    {
      date: '15-11-2021',
      role: 'Frontend Engineer',
      company: 'Microsoft',
      status: 'Pending'
    },
    {
      date: '20-10-2021',
      role: 'Backend Developer',
      company: 'Amazon',
      status: 'Rejected'
    }
  ];

  return (
    <div >
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobApplications.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                <StatusBadge status={job.status}>
                  {job.status}
                </StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;