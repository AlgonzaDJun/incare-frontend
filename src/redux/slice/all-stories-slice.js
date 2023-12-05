import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllStories = createAsyncThunk(
  "/stories/getAllData",
  async ({ token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/stories`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
    // console.log(import.meta.env.VITE_SERVER_URL);
  }
);

const allStorySlice = createSlice({
  name: "allstories",
  initialState: {
    data: [],
    status: "idle",
    erorr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllStories.rejected, (state, action) => {
        state.status = "failed";
        state.erorr = action.error.message;
      });
  },
});

export default allStorySlice.reducer;
