import React, { useState } from 'react';
import { Search, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import CategoryCarousel from './CategoryCarousel';

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center justify-center lg:justify-start">
              <span className="inline-flex items-center px-4 py-2 rounded-full
                bg-blue-50 text-blue-800 font-semibold shadow-sm
                transform transition hover:scale-105 hover:shadow-md">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                No. 1 Job Hunt Website
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-center lg:text-left
              text-gray-900 leading-tight">
              Search, Apply &
              <br />
              Get Your <span className="text-blue-700">Dream Job</span>
            </h1>

            <p className="text-lg text-gray-600 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              Discover opportunities that match your skills, passion, and career goals.
              Your next professional milestone is just a search away.
            </p>

            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="relative flex shadow-lg rounded-full
                border border-gray-200 overflow-hidden
                focus-within:ring-2 focus-within:ring-blue-500
                transition-all duration-300">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find your dream job"
                  className="w-full pl-12 pr-4 py-4 text-lg
                    outline-none border-none
                    placeholder-gray-400"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-blue-700 hover:bg-blue-800
                    text-white rounded-r-full px-8
                    h-auto

                    transition transform hover:scale-105
                    flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Button>

              </div>
              <div className=''>
                <CategoryCarousel></CategoryCarousel>
              </div>

            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block relative">
            <div className="absolute -top-12 -right-12 w-96 h-96
              bg-blue-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10">
              <img
                src="https://img.freepik.com/premium-vector/add-user-concept-illustration_86047-677.jpg?semt=ais_hybrid"
                alt="Job Search Illustration"
                className="rounded-xl shadow-2xl
                  transform transition-all duration-500
                  hover:scale-105 hover:rotate-1"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;