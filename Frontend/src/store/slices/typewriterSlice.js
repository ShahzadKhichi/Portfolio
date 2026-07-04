import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as typewriterApi from "../../api/typewriter.api";

export const fetchTypewriters = createAsyncThunk(
  "typewriters/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await typewriterApi.getAllTypewriters();
      return response.data.typewriters;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch typewriters");
    }
  }
);

export const createTypewriter = createAsyncThunk(
  "typewriters/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await typewriterApi.createTypewriter(data);
      return response.data.typewriter;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create typewriter");
    }
  }
);

export const updateTypewriter = createAsyncThunk(
  "typewriters/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await typewriterApi.updateTypewriter(id, data);
      return response.data.typewriter;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update typewriter");
    }
  }
);

export const deleteTypewriter = createAsyncThunk(
  "typewriters/delete",
  async (id, { rejectWithValue }) => {
    try {
      await typewriterApi.deleteTypewriter(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete typewriter");
    }
  }
);

const typewriterSlice = createSlice({
  name: "typewriters",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTypewriterError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypewriters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypewriters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTypewriters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTypewriter.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTypewriter.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTypewriter.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTypewriterError } = typewriterSlice.actions;
export default typewriterSlice.reducer;
