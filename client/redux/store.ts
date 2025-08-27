import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { featuresApi } from './apis/featuresApi';
import { testimonialsApi } from './apis/testimonialsApi';
import { servicesApi } from './apis/servicesApi';
import { teamApi } from './apis/teamApi';
import { blogApi } from './apis/blogApi';
import { notificationsApi } from './apis/notificationsApi';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [featuresApi.reducerPath]: featuresApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
      auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      featuresApi.middleware,
      testimonialsApi.middleware,
      servicesApi.middleware,
      teamApi.middleware,
      blogApi.middleware,
      notificationsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;