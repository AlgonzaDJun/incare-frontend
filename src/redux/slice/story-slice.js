import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const stories = createAsyncThunk(
  "/stories/getData",
  async ({ token, id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/stories/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    data: {},
    status: "idle",
    erorr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(stories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(stories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(stories.rejected, (state, action) => {
        state.status = "failed";
        state.erorr = action.error.message;
      });
  },
});

export default storySlice.reducer;
