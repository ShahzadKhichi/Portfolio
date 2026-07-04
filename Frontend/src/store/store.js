import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";
import skillReducer from "./slices/skillSlice";
import profileReducer from "./slices/profileSlice";
import typewriterReducer from "./slices/typewriterSlice";
import messageReducer from "./slices/messageSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
    skills: skillReducer,
    profile: profileReducer,
    typewriters: typewriterReducer,
    messages: messageReducer,
    auth: authReducer,
  },
});

export default store;
