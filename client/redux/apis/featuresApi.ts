import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FeatureDTO, ApiResponse } from '@/types';
import { RootState } from '../store';
export type FeatureCreateInput = Omit<FeatureDTO, '_id'>;    // for POST
export type FeatureUpdateInput = Partial<FeatureCreateInput>; // for PUT/PATCH
export const featuresApi = createApi({
  reducerPath: 'featuresApi',
 baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/features` || 'http://localhost:5000/api/features',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Feature'],
  endpoints: (builder) => ({
    getFeatures: builder.query<FeatureDTO[], void>({
      query: () => '',
      providesTags: ['Feature'],
    }),
    getFeature: builder.query<ApiResponse<FeatureDTO>, string | number>({
      query: (id) => `${id}`,
      providesTags:  ['Feature'],
    }),
    createFeature: builder.mutation<ApiResponse<FeatureDTO>, FeatureCreateInput>({
      query: (feature) => ({
        url: '',
        method: 'POST',
        body: feature,
      }),
      invalidatesTags: ['Feature'],
    }),
    updateFeature: builder.mutation<ApiResponse<FeatureDTO>, { id: string | number; data: FeatureUpdateInput } >({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags:  ['Feature'],
    }),
    deleteFeature: builder.mutation<ApiResponse<void>, string | number>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feature'],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useGetFeatureQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featuresApi;