import BookDetailsSkeleton from "@/components/book-details-loading/BookDetailsSkeleton";
import BookEditForm from "@/components/book/BookEditForm";
import { Card, CardDescription } from "@/components/ui/card";
import { useGetBookQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router";

const BookEdit = () => {
  const { id } = useParams();
  const { data: bookData, isLoading: isLoadingBook } = useGetBookQuery(id);
  const book = bookData?.data;
  return (
    <section className="py-12 px-5">
      <div className="container mx-auto">
        {isLoadingBook ? (
          <Card className="max-w-xl mx-auto">
            <CardDescription className="flex justify-center items-center flex-col">
              <BookDetailsSkeleton />
            </CardDescription>
          </Card>
        ) : (
          <BookEditForm book={book} />
        )}
      </div>
    </section>
  );
};

export default BookEdit;
