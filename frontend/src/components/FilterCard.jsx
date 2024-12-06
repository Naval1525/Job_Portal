import { RadioGroup } from "./ui/radio-group";

function FilterCard() {
  const filterData = [
    {
      filterType: "Location",
      options: [
        { value: "mumbai", label: "Mumbai" },
        { value: "bengaluru", label: "Bengaluru" },
        { value: "delhi", label: "Delhi" },
        { value: "hyderabad", label: "Hyderabad" },
        { value: "chennai", label: "Chennai" },
        { value: "pune", label: "Pune" },
        { value: "kolkata", label: "Kolkata" },
        { value: "gurgaon", label: "Gurgaon" },
        { value: "noida", label: "Noida" },
        { value: "chandigarh", label: "Chandigarh" },
        { value: "ahmedabad", label: "Ahmedabad" },
      ],
    },
    {
      filterType: "Industry",
      options: [
        { value: "software-development", label: "Software Development" },
        { value: "information-technology", label: "Information Technology" },
        { value: "artificial-intelligence", label: "Artificial Intelligence" },
        { value: "machine-learning", label: "Machine Learning" },
        { value: "data-science", label: "Data Science" },
        { value: "cloud-computing", label: "Cloud Computing" },
        { value: "cyber-security", label: "Cyber Security" },
        { value: "mobile-development", label: "Mobile Development" },
        { value: "devops", label: "DevOps" },
        { value: "web-development", label: "Web Development" },
        { value: "blockchain", label: "Blockchain" },
        { value: "internet-of-things", label: "Internet of Things (IoT)" },
      ],
    },
    {
      filterType: "Salary",
      options: [
        { value: "under-5l", label: "Under ₹5L" },
        { value: "5l-10l", label: "₹5L - ₹10L" },
        { value: "10l-15l", label: "₹10L - ₹15L" },
        { value: "15l-20l", label: "₹15L - ₹20L" },
        { value: "20l-30l", label: "₹20L - ₹30L" },
        { value: "30l-40l", label: "₹30L - ₹40L" },
        { value: "40l-50l", label: "₹40L - ₹50L" },
        { value: "50l+", label: "₹50L+" },
      ],
    },
  ];

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-lg font-bold">Filter Jobs</h1>
      <hr className="mt-3"></hr>
      <RadioGroup>
        {
            filterData.map((data,index)=>(
                <div>
                    <h1 className="font-bold text-lg">{data.filterType}</h1>
                    {
                        data.options.map((option,index)=>(
                            <div className="flex items-center space-x-2 my-2">
                                <input type="radio" value={option.value} name={data.filterType}></input>
                                <label>{option.label}</label>
                            </div>
                        ))}
                </div>
            ))
        }
      </RadioGroup>
    </div>
  );
}
export default FilterCard;
