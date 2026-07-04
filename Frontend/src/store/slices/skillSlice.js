import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as skillApi from "../../api/skill.api";

export const fetchSkills = createAsyncThunk(
  "skills/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await skillApi.getAllSkills();
      return response.data.skills;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch skills");
    }
  }
);

export const createSkill = createAsyncThunk(
  "skills/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await skillApi.createSkill(formData);
      return response.data.skill;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create skill");
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await skillApi.updateSkill(id, formData);
      return response.data.skill;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update skill");
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/delete",
  async (id, { rejectWithValue }) => {
    try {
      await skillApi.deleteSkill(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete skill");
    }
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSkillError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export const { clearSkillError } = skillSlice.actions;
export default skillSlice.reducer;
