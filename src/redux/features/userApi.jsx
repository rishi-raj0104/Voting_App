import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl'
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/user`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (newUser) => ({
        url: '/signup',
        method: 'POST',
        body: newUser,
      }),
    }),

    // Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Get user profile (Authenticated)
    getUserProfile: builder.query({
      query: () => {
        const token = localStorage.getItem('token'); 
        return {
          url: '/profile',
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),


    updateUserPassword: builder.mutation({
      query: (passwordData) => ({
        url: '/profile/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
  }),
});


export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useUpdateUserPasswordMutation,
} = userApi;
