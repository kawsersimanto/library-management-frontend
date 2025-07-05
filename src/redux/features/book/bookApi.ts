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
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} = bookApi;
