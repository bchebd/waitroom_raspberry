import { configureStore } from "@reduxjs/toolkit";
import { tagApi } from "@/store/services/tagApi";

export const store = configureStore({
    reducer: {
        [tagApi.reducerPath]: tagApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tagApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;