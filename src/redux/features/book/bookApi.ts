import { baseApi } from "@/redux/api/baseApi";
import type { IBook } from "@/types/Book";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const tempId = `temp-${Date.now()}`;

        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", [], (draft) => {
            if (draft?.data) {
              draft.data.unshift({
                _id: tempId,
                ...arg,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
            }
          })
        );

        try {
          const { data: result } = await queryFulfilled;

          dispatch(
            bookApi.util.updateQueryData("getBooks", [], (draft) => {
              if (draft?.data) {
                draft.data = draft.data.filter((b: IBook) => b._id !== tempId);
                draft.data.unshift(result.data);
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", [], (draft) => {
            if (draft?.data) {
              draft.data = draft.data.filter((book: IBook) => book._id !== id);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} = bookApi;
