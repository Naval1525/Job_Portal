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
  },
  reducers: {
    setAllJobs: (state, action) => {
      // Handle different possible response structures
      if (action.payload.status && action.payload.jobs) {
        // If the response has a status and jobs property
        state.allJobs = action.payload.jobs._id
          ? [action.payload.jobs] // Single job object
          : action.payload.jobs; // Potentially an array
      } else if (Array.isArray(action.payload)) {
        state.allJobs = action.payload;
      } else if (action.payload._id) {
        state.allJobs = [action.payload];
      } else {
        state.allJobs = [];
      }
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminjobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob,setAllAdminjobs } = jobSlice.actions;
export default jobSlice.reducer;
