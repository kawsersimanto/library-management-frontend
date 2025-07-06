import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import bookReducer from "./features/book/bookSlice";
import dialogEditReducer from "./features/dialog/dialogEditSlice";
import dialogReducer from "./features/dialog/dialogSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    dialog: dialogReducer,
    dialogEdit: dialogEditReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
