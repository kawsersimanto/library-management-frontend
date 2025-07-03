import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BookForm from "./BookForm";

const BookDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">Add new book</DialogTitle>
        <DialogDescription className="sr-only">
          Create new book and add it to the library.
        </DialogDescription>
        <BookForm />
      </DialogContent>
    </Dialog>
  );
};

export default BookDialog;
