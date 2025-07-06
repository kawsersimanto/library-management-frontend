import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/Book";
import { formatDate } from "@/utils/formatDate";
import { getGenreColor } from "@/utils/getGenreColor";
import {
  Book,
  Calendar,
  Edit,
  Eye,
  Hash,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const BookTable = () => {
  const { data: books } = useGetBooksQuery([]);
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const booksData = books?.data;

  console.log(booksData);

  const filteredBooks = booksData?.filter((book: IBook) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = Array.from(
    new Set(booksData?.map((book: IBook) => book?.genre))
  );

  const handleView = (book: IBook) => {
    console.log("View book:", book);
  };

  const handleEdit = (book: IBook) => {
    console.log("Edit book:", book);
  };

  const handleDelete = async (book: IBook) => {
    const toastId = toast.loading("Deleting Book");
    try {
      const res = await deleteBook(book?._id).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to delete book.");
      console.error(error);
    }
  };

  return (
    <section className="py-10 px-5">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Library Books Database
            </CardTitle>
            <CardDescription>
              Manage and view your library collection with {booksData?.length}{" "}
              books available
            </CardDescription>
          </CardHeader>
          <CardContent className="md:px-6 px-3">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="md:max-w-2xs w-full">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {(genres as string[])?.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[340px]">ISBN</TableHead>
                    <TableHead>Title & Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No books found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBooks?.map((book: IBook) => (
                      <TableRow key={book?._id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="text-xs bg-muted px-2 py-1 rounded inline-flex gap-2">
                            <Hash className="h-3 w-3 text-muted-foreground" />
                            {book?.isbn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm leading-tight">
                              {book?.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {book?.author}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getGenreColor(book?.genre)}
                          >
                            {book?.genre}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{book?.copies}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              book?.available ? "default" : "destructive"
                            }
                            className={
                              book?.available
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : ""
                            }
                          >
                            {book.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(book?.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(book)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(book)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(book)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-2 justify-between text-sm text-muted-foreground mt-4">
              <div>
                Showing {filteredBooks?.length} of {booksData?.length} books
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>
                    Available:{" "}
                    {booksData?.filter((b: IBook) => b?.available)?.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>
                    Unavailable:{" "}
                    {booksData?.filter((b: IBook) => !b?.available)?.length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookTable;
