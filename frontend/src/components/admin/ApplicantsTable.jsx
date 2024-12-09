import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
const shortlistingStatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status,id) => {
    try {
        axios.defaults.withCredentials == true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
        ,
        { withCredentials: true }

      );
      if (res.data.status) {
        console.log(res.data.application);
        toast.success("Status Updated");
        // dispatch(updateApplicantStatus(res.data.application));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent appliedd user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications.map((item) => (
              <tr key={item?.id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  <a
                    className="text-blue-500 underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                </TableCell>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                {/* <TableCell>{item?.status}</TableCell> */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      {shortlistingStatus.map((status, index) => (
                        <div onClick={()=>statusHandler(status,item?._id)} className="mb-2" key={index}>
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default ApplicantsTable;
