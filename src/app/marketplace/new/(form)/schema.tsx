import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  images: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .min(1, {
      message: "At least one image is required",
    })
    .max(5, {
      message: "Maximum 5 files are allowed",
    }),
  condition: z.number(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  negotiable: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;

export const defaultFormValues = {
  name: "",
  description: "",
  category: "",
  subcategory: "",
  images: [],
  condition: 3,
  negotiable: false,
  price: 0,
};
