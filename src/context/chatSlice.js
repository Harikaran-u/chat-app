import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  currentUser: {},
  selectedUser: {},
  isDark: false,
};

const chatSlice = createSlice({
  name: "chats",
  initialState: initialSlice,
  reducers: {
    updateTheme(state) {
      state.isDark = !state.isDark;
    },
    updateCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    updateSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});

export const { updateTheme, updateCurrentUser, updateSelectedUser } =
  chatSlice.actions;
export default chatSlice.reducer;
