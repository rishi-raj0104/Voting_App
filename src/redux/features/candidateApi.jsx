import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl'
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/candidate`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const candidateApi = createApi({
  reducerPath: 'candidateApi',
  baseQuery: baseQuery,
  tagTypes: ['Candidates'],
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => '/candidates',
      providesTags: ['Candidates'],
      method: 'GET',
    }),

    createCandidate: builder.mutation({
      query: (newCandidate) => ({
        url: '/',
        method: 'POST',
        body: newCandidate, 
      }),
      invalidatesTags: ['Candidates'],
    }),

    updateCandidate: builder.mutation({
      query: ({ candidateID, updatedCandidateData }) => ({
        url: `/${candidateID}`,
        method: 'PUT',
        body: updatedCandidateData,
      }),
      invalidatesTags: ['Candidates'],
    }),

    deleteCandidate: builder.mutation({
      query: (candidateID) => ({
        url: `/${candidateID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Candidates'],
    }),

    voteForCandidate: builder.mutation({
      query: (candidateID) => ({
        url: `/vote/${candidateID}`,
        method: 'GET',
      }),
    }),
    VoteCheckStatus: builder.query({
      query: () => ({
        url: `/votecheck`,
        method: 'GET',
      }),
    }),

    getVoteCounts: builder.query({
      query: () => ({
        url: `/vote/count`,
        method: 'GET',
      }),
    }),

    getVoteOfCandidate: builder.query({
      query: (candidateID) => ({
        url: `/${candidateID}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useGetCandidatesQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useVoteForCandidateMutation,
  useGetVoteCountsQuery,
  useVoteCheckStatusQuery,
  useGetVoteOfCandidateQuery,
} = candidateApi;
