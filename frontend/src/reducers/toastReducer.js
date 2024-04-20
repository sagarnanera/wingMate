// toast reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toast(state, action) {
      state.toasts.push(action.payload);
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { toast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
