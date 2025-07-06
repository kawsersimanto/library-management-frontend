import BookDetailsSkeleton from "@/components/book-details-loading/BookDetailsSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetBookQuery } from "@/redux/features/book/bookApi";
import { Book, CheckCircle, Copy, Hash, User, XCircle } from "lucide-react";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data: bookData, isLoading: isLoadingBook } = useGetBookQuery(id);
  const book = bookData?.data;

  return (
    <section className="py-12 px-5">
      <div className="container mx-auto">
        {isLoadingBook ? (
          <Card className="w-full max-w-md mx-auto p-6">
            <BookDetailsSkeleton />
          </Card>
        ) : (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold leading-tight">
                    {book?.title}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {book?.author}
                  </CardDescription>
                </div>
                <Badge
                  variant={book?.available ? "default" : "secondary"}
                  className="ml-2"
                >
                  {book?.available ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {book?.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{book?.genre}</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span>ISBN: {book?.isbn}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Copy className="h-4 w-4" />
                  <span>{book?.copies} copies</span>
                </div>
              </div>

              {book?.description && <Separator />}

              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book?.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
