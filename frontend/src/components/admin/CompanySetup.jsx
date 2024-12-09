import { ArrowLeft } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

function CompanySetup() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-xl mx-auto my-10">
        <form action="">
          <div className="flex items-center gap-5 p-8">
            <Button className="flex items-center gap-2 text-white font-semibold bg-black rounded-2xl hover:bg-black">
              <ArrowLeft></ArrowLeft>
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="rounded-xl mt-2"
                value={input.name}
                onChange={changeEventhandler}
              ></Input>
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="rounded-xl mt-2"
                value={input.name}
                onChange={changeEventhandler}
              ></Input>
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="rounded-xl mt-2"
                value={input.name}
                onChange={changeEventhandler}
              ></Input>
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="rounded-xl mt-2"
                value={input.name}
                onChange={changeEventhandler}
              ></Input>
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                className="rounded-xl mt-2"
                value={input.name}
                onChange={changeEventhandler}
              ></Input>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
export default CompanySetup;
