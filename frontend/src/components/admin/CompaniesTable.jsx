import { useState } from "react";
import useGetAllCompany from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import useGetCompanyById from "@/hooks/useGetCompanyById";

function CompaniesTable() {
  useGetAllCompany();

  const navigate = useNavigate();
  const { allCompanies: companies } = useSelector((store) => store.company); // Correct state reference
  const [filterCompany, setFilterCompany] = useState([]);



  // Update filtered companies whenever the company list changes
  useState(() => {
    setFilterCompany(companies);
  }, [companies]);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm)
    );
    setFilterCompany(filtered);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search companies..."
          className="border rounded px-3 py-2 w-full"
          onChange={handleFilter}
        />
      </div>

      {/* Table */}
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
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Companies found
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {company.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex bg-black text-white rounded-2xl px-8">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
