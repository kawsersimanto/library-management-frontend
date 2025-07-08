import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { IBook } from "@/types/Book";
import { format } from "date-fns";
import { BookOpen, CalendarIcon, Hash, User } from "lucide-react";
import { useState } from "react";

// Mock book data - in real app this would come from your API
const mockBook = {
  id: "6869de411eb9d12c58d34e89",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0-7432-7356-5",
  availableQuantity: 12,
  category: "Classic Literature",
};

export default function BookBorrowingForm({ book }: { book: IBook }) {
  console.log(book);

  const [quantity, setQuantity] = useState(5);
  const [dueDate, setDueDate] = useState<Date>(new Date("2025-07-30"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const borrowingData = {
      book: mockBook.id,
      quantity: quantity,
      dueDate: dueDate.toISOString(),
    };

    console.log("Submitting borrowing request:", borrowingData);

    setIsSubmitting(false);
  };

  const maxQuantity = Math.min(mockBook.availableQuantity, 10);

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
          <div className="flex gap-4 p-4 rounded-lg border">
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg">{mockBook.title}</h3>
              <p className="text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                {mockBook.author}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Hash className="h-4 w-4" />
                ISBN: {mockBook.isbn}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary">{mockBook.category}</Badge>
                <Badge variant="outline">
                  {mockBook.availableQuantity} available
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Borrowing Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantity Selection */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity to Borrow</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Math.min(
                          maxQuantity,
                          Number.parseInt(e.target.value) || 1
                        )
                      )
                    )
                  }
                  min="1"
                  max={maxQuantity}
                  className="w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantity(Math.min(maxQuantity, quantity + 1))
                  }
                  disabled={quantity >= maxQuantity}
                >
                  +
                </Button>
                <span className="text-sm text-muted-foreground">
                  (Max: {maxQuantity})
                </span>
              </div>
            </div>

            {/* Due Date Selection */}
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Book ID Display */}
            <div className="space-y-2">
              <Label>Book ID</Label>
              <Input
                value={mockBook.id}
                readOnly
                className="bg-muted font-mono text-sm"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting
              ? "Processing..."
              : `Borrow ${quantity} Book${quantity > 1 ? "s" : ""}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
