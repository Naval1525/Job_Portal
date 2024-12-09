import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        allCompanies: [], // Initialize as an empty array
        singleCompany: null,
    },
    reducers: {
        setAllCompanies: (state, action) => {
        // Handle different possible response structures
        if (action.payload.status && action.payload.companies) {
            // If the response has a status and companies property
            state.allCompanies = action.payload.companies._id
            ? [action.payload.companies] // Single company object
            : action.payload.companies; // Potentially an array
        } else if (Array.isArray(action.payload)) {
            state.allCompanies = action.payload;
        } else if (action.payload._id) {
            state.allCompanies = [action.payload];
        } else {
            state.allCompanies = [];
        }
        },
        setSingleCompany: (state, action) => {
        state.singleCompany = action.payload;
        },
    },
})

export const { setAllCompanies, setSingleCompany } = companySlice.actions;
export default companySlice.reducer;