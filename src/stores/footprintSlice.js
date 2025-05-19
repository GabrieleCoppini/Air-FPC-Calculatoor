import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { calculateFlightFootprint } from "../stores/apiClient";

export const fetchFlightFootprint = createAsyncThunk(
  "footprint/fetchFlightFootprint",
  async ({ apiKey, segments, cabinClass }) => {
    const data = await calculateFlightFootprint(apiKey, segments, cabinClass);
    return data;
  }
);

const footprintSlice = createSlice({
  name: "footprint",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearFootprint(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightFootprint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlightFootprint.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFlightFootprint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearFootprint } = footprintSlice.actions;
export default footprintSlice.reducer;
