import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postStory = createAsyncThunk(
  "/stories/postStory",
  async ({ token, data }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/stories`,
      { content: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const postStorySlice = createSlice({
  name: "postStory",
  initialState: {
    status: "idle",
    erorr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postStory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postStory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postStory.rejected, (state, action) => {
        state.status = "failed";
        state.erorr = action.error.message;
      });
  },
});

export default postStorySlice.reducer;
