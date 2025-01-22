import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { candidateApi } from './features/candidateApi';
import { userApi } from './features/userApi'
import userReducer from './features/userSlice';
export const store = configureStore({
  reducer: {
    [candidateApi.reducerPath]: candidateApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      candidateApi.middleware,
      userApi.middleware),
})

setupListeners(store.dispatch)


export default store;