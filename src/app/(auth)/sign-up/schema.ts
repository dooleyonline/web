import { z } from "zod/v4";

const signUpForm = z
  .object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    email: z.email().refine((email) => email.endsWith("emory.edu"), {
      message: "Email must be a valid Emory email address",
    }),
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    password2: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  .refine(({ password, password2 }) => password === password2, {
    message: "Passwords do not match",
  });

type SignUpData = z.output<typeof signUpForm>;

export { signUpForm, type SignUpData };
