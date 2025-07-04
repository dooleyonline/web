import { z } from "zod/v4";

const signInForm = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type SignInData = z.output<typeof signInForm>;

export { signInForm, type SignInData };
