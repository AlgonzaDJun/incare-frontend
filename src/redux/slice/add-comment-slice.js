import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk(
  "/stories/addComment",
  async ({ token, data, id }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/stories/${id}/comment`,
      { comment: data },
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

const addCommentSlice = createSlice({
  name: "addComment",
  initialState: {
    status: "idle",
    erorr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.erorr = action.error.message;
      });
  },
});

export default addCommentSlice.reducer;
