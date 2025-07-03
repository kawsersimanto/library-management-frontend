import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const BookForm = () => {
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
          Add new book to the library.
        </DialogDescription>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Username</Label>
            <Input id="username-1" name="username" defaultValue="@peduarte" />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
