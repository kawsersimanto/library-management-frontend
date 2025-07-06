import type { RootState } from "@/redux/store";
import type { IBook } from "@/types/Book";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  bookDialogOpen: boolean;
  bookData: Omit<IBook, "createdAt" | "updatedAt"> | null;
}

const initialState: DialogState = {
  bookDialogOpen: false,
  bookData: null,
};

const dialogEditSlice = createSlice({
  name: "dialogEdit",
  initialState,
  reducers: {
    openEditBookDialog: (state) => {
      state.bookDialogOpen = true;
    },
    closeEditBookDialog: (state) => {
      state.bookDialogOpen = false;
    },
    setEditBookDialog: (state, action: PayloadAction<boolean>) => {
      state.bookDialogOpen = action.payload;
    },
    addBookUpdateData: (
      state,
      action: PayloadAction<Partial<Omit<IBook, "createdAt" | "updatedAt">>>
    ) => {
      state.bookData = {
        ...state.bookData,
        ...action.payload,
      };
    },
  },
});

export const selectEditDialog = (state: RootState) => {
  return state.dialogEdit;
};

export const { openEditBookDialog, closeEditBookDialog, setEditBookDialog } =
  dialogEditSlice.actions;

export default dialogEditSlice.reducer;
