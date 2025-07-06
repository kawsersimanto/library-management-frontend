import {
  selectEditDialog,
  setEditBookDialog,
} from "@/redux/features/dialog/dialogEditSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BookEditForm from "./BookEditForm";

const BookEditDialog = () => {
  const dispatch = useAppDispatch();
  const { bookDialogOpen } = useAppSelector(selectEditDialog);
  return (
    <Dialog
      open={bookDialogOpen}
      onOpenChange={(val) => dispatch(setEditBookDialog(val))}
    >
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Edit Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">Edit book</DialogTitle>
        <DialogDescription className="sr-only">
          Edit the book and add it to the library.
        </DialogDescription>
        <BookEditForm />
      </DialogContent>
    </Dialog>
  );
};

export default BookEditDialog;
