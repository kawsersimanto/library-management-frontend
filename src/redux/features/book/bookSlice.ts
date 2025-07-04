import type { IBook } from "@/types/Book";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface InitialState {
  books: IBook[];
}

const initialState: InitialState = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },
  },
});

export const selectBooks = (state: RootState) => {
  return state.books;
};

export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
