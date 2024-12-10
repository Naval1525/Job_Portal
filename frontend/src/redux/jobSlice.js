// import { createSlice } from '@reduxjs/toolkit';

// const jobSlice = createSlice({
//   name: 'job',
//   initialState: {
//     allJobs: [], // Initialize as an empty array
//   },
//   reducers: {
//     setAllJobs: (state, action) => {
//       // Ensure allJobs is always an array
//       state.allJobs = Array.isArray(action.payload)
//         ? action.payload
//         : action.payload.jobs
//         ? action.payload.jobs
//         : [action.payload];
//     }
//   }
// });

// export const { setAllJobs } = jobSlice.actions;
// export default jobSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [], // Initialize as an empty array
    singleJob: null,

    allAdminJobs: [],
    allAppliedJobs: [],
    searchQuery: "",
    jobFilters: {
      location: '',
      industry: '',
      salary: ''
    }
  },
  reducers: {
    setAllJobs: (state, action) => {
      // If the payload is an array, use it directly
      if (Array.isArray(action.payload)) {
        state.allJobs = action.payload;
      }
      // If payload has a jobs property that is an array
      else if (action.payload.jobs && Array.isArray(action.payload.jobs)) {
        state.allJobs = action.payload.jobs;
      }
      // If payload is a single job object
      else if (action.payload._id) {
        state.allJobs = [action.payload];
      }
      // Default to an empty array
      else {
        state.allJobs = [];
      }
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminjobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedjobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setJobFilters: (state, action) => {
      state.jobFilters = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminjobs,
  setAllAppliedJobs,
  setSearchQuery,
  setJobFilters
} = jobSlice.actions;
export default jobSlice.reducer;
