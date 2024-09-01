import { z } from "zod";

export const RecordSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Description must contain at least 2 character(s)" })
    .max(50, { message: "Description must contain at most 50 character(s)" }),
  amount: z.coerce.number().min(-1000000, { message: "Amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
});

export const RecordWithIdSchema = z.object({
  _id: z.string(),
  description: z
    .string()
    .min(2, { message: "Description must contain at least 2 character(s)" })
    .max(50, { message: "Description must contain at most 50 character(s)" }),
  amount: z.coerce.number().min(-1000000, { message: "Amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
});
