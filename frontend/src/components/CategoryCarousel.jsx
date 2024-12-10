import React, { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

function CategoryCarousel() {
  const [currentScroll, setCurrentScroll] = useState(0);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");

    // Placeholder for search functionality

    console.log("Searching for:", query);
  };

  const categories = [
    "Software Developer", "Data Scientist", "Cloud Architect", "Cybersecurity Analyst",
    "AI/ML Engineer", "Doctor", "Nurse", "Pharmacist", "Radiologist",
    "Medical Lab Technician", "Teacher", "Professor", "Instructional Designer",
    "Education Counselor", "School Administrator", "Financial Analyst",
    "Accountant", "Investment Banker", "Auditor", "Loan Officer",
    "Graphic Designer", "UX/UI Designer"
  ];

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      const newScroll = direction === 'left'
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;

      containerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      setCurrentScroll(newScroll);
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-xl mx-auto my-20">
      <button
        onClick={() => scroll('left')}
        className="
          absolute
          -left-14
          z-10
          bg-gray-800
          text-white
          rounded-full
          p-2
          shadow-lg
          hover:bg-gray-700
          transition-colors
          duration-300
        "
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div
        ref={containerRef}
        className="
          flex
          overflow-x-hidden
          space-x-4
          py-4
          scroll-smooth
          w-full
        "
      >
        {categories.map((name, index) => (
          <button onClick={()=>handleSearch(name)}
            key={index}
            className="
              px-4
              py-2
              bg-gray-800
              text-white
              rounded-xl
              hover:bg-gray-700
              transition-colors
              duration-300
              flex-shrink-0
              focus:outline-none
              focus:ring-2
              focus:ring-gray-600

            "
          >
            {name}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="
          absolute
          -right-14
          z-10
          bg-gray-800
          text-white
          rounded-full
          p-2
          shadow-lg
          hover:bg-gray-700
          transition-colors
          duration-300

        "
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CategoryCarousel;