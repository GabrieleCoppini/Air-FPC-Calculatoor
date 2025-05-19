import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAirports } from "../stores/apiClient";

export const loadAirports = createAsyncThunk(
  "airports/loadAirports",
  async () => {
    const data = await fetchAirports();
    return data;
  }
);

const airportsSlice = createSlice({
  name: "airports",
  initialState: {
    airports: [],
    loading: false,
    error: null,
    selectedAirport: null, // Stato per aeroporto selezionato
  },
  reducers: {
    selectAirport(state, action) {
      state.selectedAirport = action.payload;
    },
    clearSelection(state) {
      state.selectedAirport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAirports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAirports.fulfilled, (state, action) => {
        state.airports = action.payload;
        state.loading = false;
      })
      .addCase(loadAirports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectAirport, clearSelection } = airportsSlice.actions;

export default airportsSlice.reducer;
