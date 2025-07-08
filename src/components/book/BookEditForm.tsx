import { useUpdateBookMutation } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/Book";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextArea from "../form/FormTextArea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { FormSchema } from "./BookFormSchema";

const BookEditForm = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  const [updateBook, { isLoading: isUpdatingBook }] = useUpdateBookMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: book?.title,
      author: book?.author,
      genre: book?.genre,
      isbn: book?.isbn,
      description: book?.description,
      copies: book?.copies,
      available: book?.available,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    form.reset();
    toast.success("Book Updated Successfully");
    const updatedData = {
      ...data,
      _id: book._id,
    };

    const res = await updateBook(updatedData).unwrap();

    try {
      if (res?.success) {
        navigate("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <FormInput
                control={form.control}
                name="title"
                placeholder="Enter book title"
                label="Book Title"
              />
              <FormInput
                control={form.control}
                name="author"
                placeholder="Enter book author"
                label="Book Author"
              />
              <FormSelect
                control={form.control}
                name="genre"
                placeholder="Select genre"
                label="Book Genre"
                options={[
                  { label: "FICTION", value: "FICTION" },
                  { label: "NON_FICTION", value: "NON_FICTION" },
                  { label: "SCIENCE", value: "SCIENCE" },
                  { label: "HISTORY", value: "HISTORY" },
                  { label: "BIOGRAPHY", value: "BIOGRAPHY" },
                  { label: "FANTASY", value: "FANTASY" },
                ]}
              />
              <FormInput
                control={form.control}
                name="isbn"
                placeholder="Enter book isbn"
                label="# ISBN"
              />
              <FormTextArea
                control={form.control}
                name="description"
                label="Book Description"
                placeholder="Tell us about the book"
              />
              <FormInput
                control={form.control}
                name="copies"
                placeholder="Enter book copies"
                label="Total Copies"
                type="number"
              />
              <FormSelect
                control={form.control}
                name="available"
                placeholder="Select status"
                label="Book Availability"
                options={[
                  { label: "Available", value: "true" },
                  { label: "Not available", value: "false" },
                ]}
                valueTransform={(val) => val === "true"}
              />
            </div>
            <Button disabled={isUpdatingBook} type="submit" className="mt-6">
              {isUpdatingBook ? "Updating" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookEditForm;
