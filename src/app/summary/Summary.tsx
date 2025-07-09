import BarsLoading from "@/components/book-loading/BarsLoading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/features/borrow-book/borrowBookApi";
import { Book } from "lucide-react";

type BookItem = {
  title: string;
  isbn: string;
};

type SummaryEntry = {
  totalQuantity: number;
  book: BookItem[];
};

type SummaryBook = BookItem & {
  totalQuantity: number;
};

const Summary = () => {
  const { data: summaryData, isLoading: isLoadingSummary } =
    useGetBorrowSummaryQuery([]);

  const summaries: SummaryEntry[] = summaryData?.data ?? [];

  const allBooks: SummaryBook[] = summaries.flatMap((entry) =>
    entry.book.map((b) => ({
      ...b,
      totalQuantity: entry.totalQuantity,
    }))
  );

  return (
    <section className="py-12 px-5">
      <div className="container mx-auto">
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
          {/* Summary Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Book Borrowing Summary
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Books Table */}
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingSummary ? (
                <BarsLoading color="blue" size="lg" />
              ) : allBooks?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead className="text-center">
                        Copies Borrowed
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allBooks.map((book, index) => (
                      <TableRow key={book?.isbn}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {book?.title}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {book?.isbn}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            {book?.totalQuantity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No books found in inventory</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Summary;
