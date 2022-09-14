import { z } from "zod";

export const productValuesSchema = z.object({
  name: z.string().min(1, { message: "Name must have at least one character" }),
  price: z.number().min(1, { message: "Price can't be lower than 1" }),
});

export type ProductValues = z.infer<typeof productValuesSchema>;
