import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
});
