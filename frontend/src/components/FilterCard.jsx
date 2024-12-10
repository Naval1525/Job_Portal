import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobFilters } from "@/redux/jobSlice";

function FilterCard() {
    const dispatch = useDispatch();
    const { jobFilters } = useSelector((store) => store.job);
    const [selectedValues, setSelectedValues] = useState({
        Location: jobFilters?.location || "",
        Industry: jobFilters?.industry || "",
        Salary: jobFilters?.salary || ""
    });

    // Dispatch filters to Redux store whenever they change
    useEffect(() => {
        dispatch(setJobFilters({
            location: selectedValues.Location,
            industry: selectedValues.Industry,
            salary: selectedValues.Salary
        }));
    }, [selectedValues, dispatch]);

    const handleChange = (filterType, value) => {
        // If the same filter is clicked again, deselect it
        const newValue = selectedValues[filterType] === value ? "" : value;

        setSelectedValues((prev) => ({
            ...prev,
            [filterType]: newValue
        }));
    };

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
        <div className="w-full bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-800">Filter Jobs</h1>
                {Object.values(selectedValues).some(value => value !== "") && (
                    <button
                        onClick={() => setSelectedValues({ Location: "", Industry: "", Salary: "" })}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>
            <hr className="border-gray-200 mb-4" />

            {filterData.map((filterGroup, index) => (
                <div key={index} className="mb-6">
                    <h2 className="font-semibold text-lg text-gray-700 mb-3">
                        {filterGroup.filterType}
                    </h2>
                    <div className="space-y-2">
                        {filterGroup.options.map((option, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                                    selectedValues[filterGroup.filterType] === option.value
                                        ? "bg-blue-50"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                <input
                                    type="radio"
                                    id={`${filterGroup.filterType}-${option.value}`}
                                    name={filterGroup.filterType}
                                    value={option.value}
                                    checked={selectedValues[filterGroup.filterType] === option.value}
                                    onChange={() => handleChange(filterGroup.filterType, option.value)}
                                    className="form-radio text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`${filterGroup.filterType}-${option.value}`}
                                    className="cursor-pointer text-gray-700 w-full"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilterCard;