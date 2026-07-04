import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as projectApi from "../../api/project.api";

// Async Thunks
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectApi.getAllProjects();
      return response.data.projects;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch projects");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await projectApi.createProject(formData);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create project");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await projectApi.updateProject(id, formData);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await projectApi.deleteProject(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete project");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createProject
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateProject
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // deleteProject
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
