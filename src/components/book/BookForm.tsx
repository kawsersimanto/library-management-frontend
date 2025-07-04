import { addBook } from "@/redux/features/book/bookSlice";
import type { IBook } from "@/types/Book";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextArea from "../form/FormTextArea";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FormSchema } from "./BookFormSchema";

const BookForm = () => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FANTASY",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const book: IBook = {
      ...data,
      _id: uuidv4(),
      description: data.description ?? "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addBook(book));
    console.log(book);
  };

  return (
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
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
