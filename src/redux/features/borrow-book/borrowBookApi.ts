import { baseApi } from "@/redux/api/baseApi";

const borrowBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowSummary: builder.query({
      query: () => ({
        url: "/borrow",
        method: "GET",
      }),
      providesTags: ["borrow"],
    }),

    borrowBook: builder.mutation({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["borrow"],
    }),
  }),
});

export const { useGetBorrowSummaryQuery, useBorrowBookMutation } =
  borrowBookApi;
