import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextArea from "../form/FormTextArea";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Book title is required",
  }),
  author: z.string().min(1, {
    message: "Book author is required",
  }),
  isbn: z.string().min(1, {
    message: "Book isbn is required",
  }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      message: `Book genre must be "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY", `,
    }
  ),
  description: z.string().optional(),
  copies: z.coerce.number().min(1, {
    message: "Minimum 1 copy is required",
  }),
  available: z.coerce.boolean(),
});

const BookForm = () => {
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
    console.log(data);
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
