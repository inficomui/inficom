import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, ApiResponse } from '@/types';
import { RootState } from '../store';

export const blogApi = createApi({
  reducerPath: 'blogApi',
 baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs` || 'http://localhost:5000/api/blogs',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '',
      providesTags: ['Post'],
    }),
    getPost: builder.query<ApiResponse<Post>, string | number>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<ApiResponse<Post>, FormData>({
      query: (post) => ({
        url: '',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
updatePost: builder.mutation<any, { id: string; body: FormData }>({
  query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<ApiResponse<void>, string | number>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;