import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLike = createAsyncThunk(
  "/stories/updateLike",
  async ({ token, id }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/stories/${id}/like`,
      {},
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

const updateLikeSlice = createSlice({
  name: "updateLike",
  initialState: {
    status: "idle",
    erorr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLike.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateLike.rejected, (state, action) => {
        state.status = "failed";
        state.erorr = action.error.message;
      });
  },
});

export default updateLikeSlice.reducer;
