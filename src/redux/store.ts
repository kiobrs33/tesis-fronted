import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../modules/auth";

const persistedStoreMiddlware =
  (store: { getState: () => unknown }) =>
  (next: (arg0: unknown) => void) =>
  (action: unknown) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistedStoreMiddlware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
