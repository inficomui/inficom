import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TeamMember, ApiResponse } from '@/types';
import { RootState } from '../store';

export const teamApi = createApi({
  reducerPath: 'teamApi',

   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/team` || 'http://localhost:5000/api/team',
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
  tagTypes: ['TeamMember'],
  endpoints: (builder) => ({
    getTeamMembers: builder.query<TeamMember[], void>({
      query: () => '',
      providesTags: ['TeamMember'],
    }),
    getTeamMember: builder.query<ApiResponse<TeamMember>, string | number>({
      query: (id) => `${id}`,
      providesTags: ['TeamMember'],
    }),
    createTeamMember: builder.mutation<ApiResponse<TeamMember>,FormData>({
      query: (member) => ({
        url: '',
        method: 'POST',
        body: member,
      }),
      invalidatesTags: ['TeamMember'],
    }),
    updateTeamMember: builder.mutation<ApiResponse<TeamMember>, { id: string ; data:FormData }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TeamMember'],
    }),
    deleteTeamMember: builder.mutation<ApiResponse<void>, string >({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeamMember'],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useGetTeamMemberQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;