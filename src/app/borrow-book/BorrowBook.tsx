import BookDetailsSkeleton from "@/components/book-details-loading/BookDetailsSkeleton";
import BookBorrowingForm from "@/components/borrow-book/BorrowBookForm";
import { Card } from "@/components/ui/card";
import { useGetBookQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router";

const BorrowBook = () => {
  const params = useParams();
  const { data: bookData, isLoading: isLoadingBook } = useGetBookQuery(
    params?.id
  );
  const book = bookData?.data;
  console.log(book);

  return (
    <section className="py-12 px-5">
      <div className="container mx-auto">
        {isLoadingBook ? (
          <Card className="w-full max-w-xl mx-auto p-6">
            <BookDetailsSkeleton />
          </Card>
        ) : (
          <BookBorrowingForm book={book} />
        )}
      </div>
    </section>
  );
};

export default BorrowBook;
