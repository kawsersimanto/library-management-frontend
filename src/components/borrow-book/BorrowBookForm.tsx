import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/features/borrow-book/borrowBookApi";
import type { IBook } from "@/types/Book";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { BookOpen, CalendarIcon, Hash, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { BorrowFormSchema } from "./BorrowFormSchema";

const BookBorrowingForm = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  const [borrowBook, { isLoading: isBorrowingBook }] = useBorrowBookMutation();
  const form = useForm<z.infer<typeof BorrowFormSchema>>({
    resolver: zodResolver(BorrowFormSchema),
    defaultValues: {
      quantity: 1,
      dueDate: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof BorrowFormSchema>) => {
    const toastId = toast.loading("Borrowing Book from the library");

    const today = new Date();
    const selected = new Date(data.dueDate);

    // Midnight date comparison
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() === today.getTime()) {
      toast.error("Please select a future date", { id: toastId });
      return;
    }

    const borrowingData = {
      book: book._id,
      quantity: data.quantity,
      dueDate: data.dueDate.toISOString(),
    };

    const res = await borrowBook(borrowingData).unwrap();

    try {
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        navigate("/");
      } else {
        toast.message(res?.message, { id: toastId });
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  };

  const maxQuantity = Math.min(book.copies, 10);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Borrow Book
          </CardTitle>
          <CardDescription>
            Complete the form below to borrow this book from the library
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Book Info */}
          <div className="flex gap-4 p-4 rounded-lg border">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                {book.author}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Hash className="h-4 w-4" />
                ISBN: {book.isbn}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">{book.genre}</Badge>
                <Badge variant="outline">{book.copies} available</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Borrow</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      form.setValue(
                        "quantity",
                        Math.max(1, form.getValues("quantity") - 1)
                      )
                    }
                    disabled={form.watch("quantity") <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    {...form.register("quantity", { valueAsNumber: true })}
                    min={1}
                    max={maxQuantity}
                    className="w-20 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      form.setValue(
                        "quantity",
                        Math.min(maxQuantity, form.getValues("quantity") + 1)
                      )
                    }
                    disabled={form.watch("quantity") >= maxQuantity}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    (Max: {maxQuantity})
                  </span>
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.watch("dueDate") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("dueDate")
                        ? format(form.watch("dueDate"), "PPP")
                        : "Select due date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch("dueDate")}
                      onSelect={(date) =>
                        date && form.setValue("dueDate", date)
                      }
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" disabled={isBorrowingBook}>
                {isBorrowingBook
                  ? "Processing..."
                  : `Borrow ${form.watch("quantity")} Book${
                      form.watch("quantity") > 1 ? "s" : ""
                    }`}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookBorrowingForm;
