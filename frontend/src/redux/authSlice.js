// import { createSlice } from "@reduxjs/toolkit";


// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         loading: false,
//         user:null,
//     },
//     reducers: {
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setUser: (state, action) => {
//             state.user = action.payload;

//         }

//     },
// });

// export const { setLoading,setUser } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

// Check for existing user in localStorage when the app loads
const initialState = {
  loading: false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Persist the user data in localStorage
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user"); // Remove user data on logout
      }
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
