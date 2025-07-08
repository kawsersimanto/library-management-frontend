import { z } from "zod";

export const BorrowFormSchema = z.object({
  quantity: z
    .number()
    .min(1, "Minimum 1 book")
    .max(10, "Cannot borrow more than 10 books"),
  dueDate: z.date(),
});
