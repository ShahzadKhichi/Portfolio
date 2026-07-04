import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileApi from "../../api/profile.api";

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi.getProfile();
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateProfile(formData);
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const incrementViews = createAsyncThunk(
  "profile/incrementViews",
  async (_, { rejectWithValue }) => {
    try {
      await profileApi.incrementViews();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to increment views");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
