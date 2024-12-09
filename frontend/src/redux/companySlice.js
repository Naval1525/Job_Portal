// src/redux/slices/companySlice.js
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompanies: [], // Initialize as an empty array
    singleCompany: null, // Initially, singleCompany is null
  },
  reducers: {
    setAllCompanies: (state, action) => {
      if (Array.isArray(action.payload)) {
        // If payload is an array of companies
        state.allCompanies = action.payload;
      } else if (action.payload?.companies) {
        // If payload contains a "companies" key
        state.allCompanies = Array.isArray(action.payload.companies)
          ? action.payload.companies // Assign directly if it's an array
          : [action.payload.companies]; // Wrap in array if it's a single object
      } else if (action.payload?._id) {
        // If payload is a single company object
        state.allCompanies = [action.payload];
      } else {
        // Default fallback
        state.allCompanies = [];
      }
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload; // Set single company data
    },
  },
});

export const { setAllCompanies, setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
