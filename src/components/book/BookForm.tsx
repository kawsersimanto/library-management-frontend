import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
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
});

const BookForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FANTASY",
      isbn: "",
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
        </div>
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
