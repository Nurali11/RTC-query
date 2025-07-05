import { configureStore } from "@reduxjs/toolkit";
import { stacksApi } from "./stackApi";

export const store = configureStore({
    reducer: {
        [stacksApi.reducerPath]:stacksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stacksApi.middleware)
})