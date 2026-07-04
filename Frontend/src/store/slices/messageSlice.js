import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as messageApi from "../../api/message.api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await messageApi.getAllMessages();
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async (id, { rejectWithValue }) => {
    try {
      await messageApi.deleteMessage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete message");
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMessageError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m._id !== action.payload);
      });
  },
});

export const { clearMessageError } = messageSlice.actions;
export default messageSlice.reducer;
