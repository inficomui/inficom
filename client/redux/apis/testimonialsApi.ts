import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Testimonial, ApiResponse } from '@/types';
import { RootState } from '../store';

export const testimonialsApi = createApi({
  reducerPath: 'testimonialsApi',
  
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials` || 'http://localhost:5000/api/testimonials',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
  tagTypes: ['Testimonial'],
  endpoints: (builder) => ({
    getTestimonials: builder.query<Testimonial[], void>({
      query: () => '',
      providesTags: ['Testimonial'],
    }),
    getTestimonial: builder.query<ApiResponse<Testimonial>, number>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Testimonial', id }],
    }),
    createTestimonial: builder.mutation<ApiResponse<Testimonial>, FormData >({
      query: (testimonial) => ({
        url: '',
        method: 'POST',
        body: testimonial,
      }),
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonial: builder.mutation<ApiResponse<Testimonial>, { id: number; data: FormData  }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags:['Testimonial'],
    }),
    deleteTestimonial: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetTestimonialQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi;