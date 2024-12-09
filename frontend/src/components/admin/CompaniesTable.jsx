import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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

function CompaniesTable() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>
            <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
            </Avatar>
          </TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>18-07-2024</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
                <PopoverTrigger><MoreHorizontal></MoreHorizontal></PopoverTrigger>
                <PopoverContent className="w-32 flex">
                    <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4"></Edit2>
                        <span>Edit</span>
                    </div>

                </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
}
export default CompaniesTable;
