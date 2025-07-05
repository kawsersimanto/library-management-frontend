import { baseApi } from "@/redux/api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = bookApi;
