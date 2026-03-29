import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByToken } from "../../services/services";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetchUser: Calling getUserByToken API...");
      const res = await getUserByToken();
      console.log("fetchUser: Response received:", res);
      
      // Ensure the response structure is correct
      const userData = res.data.user || res.data;
      
      console.log("fetchUser: User data extracted:", userData);
      return userData;
    } catch (err) {
      console.error("fetchUser: Error fetching user:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error fetching user";
      console.error("fetchUser: Error details:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        console.log("fetchUser pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("fetchUser fulfilled with data:", action.payload);
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.log("fetchUser rejected with error:", action.payload);
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;