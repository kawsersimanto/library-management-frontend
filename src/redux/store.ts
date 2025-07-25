import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import bookReducer from "./features/book/bookSlice";
import dialogReducer from "./features/dialog/dialogSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    dialog: dialogReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
