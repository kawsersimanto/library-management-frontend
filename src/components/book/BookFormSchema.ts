import z from "zod";

export const FormSchema = z.object({
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
