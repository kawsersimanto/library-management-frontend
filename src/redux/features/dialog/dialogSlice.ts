import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DialogState = {
  bookDialogOpen: boolean;
};

const initialState: DialogState = {
  bookDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openBookDialog: (state) => {
      state.bookDialogOpen = true;
    },
    closeBookDialog: (state) => {
      state.bookDialogOpen = false;
    },
    setBookDialog: (state, action: PayloadAction<boolean>) => {
      state.bookDialogOpen = action.payload;
    },
  },
});

export const selectDialog = (state: RootState) => {
  return state.dialog;
};

export const { openBookDialog, closeBookDialog, setBookDialog } =
  dialogSlice.actions;

export default dialogSlice.reducer;
