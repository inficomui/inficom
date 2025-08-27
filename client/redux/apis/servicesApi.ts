import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServiceDTO, ApiResponse } from '@/types';
import { RootState } from '../store';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',

   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/services` || 'http://localhost:5000/api/services',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
  tagTypes: ['Service'],
  endpoints: (builder) => ({
    getServices: builder.query<ServiceDTO[], void>({
      query: () => '',
      providesTags: ['Service'],
    }),
    getService: builder.query<ServiceDTO, string | number>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Service', id }],
    }),
    createService: builder.mutation<ApiResponse<ServiceDTO>, Partial<ServiceDTO>>({
      query: (service) => ({
        url: '',
        method: 'POST',
        body: service,
      }),
      invalidatesTags: ['Service'],
    }),
    updateService: builder.mutation<ApiResponse<ServiceDTO>, { id: string | number; data: Partial<ServiceDTO> }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }],
    }),
    deleteService: builder.mutation<ApiResponse<void>, string | number>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;