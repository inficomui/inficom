import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NotificationBanner, ApiResponse } from '@/types';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:  `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/`,
    // baseUrl: '/api//',
  }),
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    getNotifications: builder.query<ApiResponse<NotificationBanner[]>, void>({
      query: () => '',
      providesTags: ['Notification'],
    }),
    getNotification: builder.query<ApiResponse<NotificationBanner>, string | number>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Notification', id }],
    }),
    createNotification: builder.mutation<ApiResponse<NotificationBanner>, Partial<NotificationBanner>>({
      query: (notification) => ({
        url: '',
        method: 'POST',
        body: notification,
      }),
      invalidatesTags: ['Notification'],
    }),
    updateNotification: builder.mutation<ApiResponse<NotificationBanner>, { id: string | number; data: Partial<NotificationBanner> }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Notification', id }],
    }),
    deleteNotification: builder.mutation<ApiResponse<void>, string | number>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;