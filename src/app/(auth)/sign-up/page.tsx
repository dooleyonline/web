"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/api/shared";
import { ENDPOINTS, apiFetch } from "@/lib/api/core";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SignUpData, signUpForm } from "./schema";

const REDIRECT_PATH = "/";

const SignUpPage = () => {
  const { accessToken } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
    },
  });

  useEffect(() => {
    if (accessToken) {
      router.push(REDIRECT_PATH);
    }
  }, [accessToken, router]);

  const handleSubmit = async (data: SignUpData) => {
    const { error } = await apiFetch<SignUpData>(ENDPOINTS.AUTH.SIGN_UP, {
      method: "POST",
      data,
    });

    if (error) {
      console.error("Error signing up:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
      return;
    }

    toast.success("Welcome!", { position: "top-center" });
    router.push(REDIRECT_PATH);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@emory.edu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              !signUpForm.safeParse(form.watch()).success
            }
            className="w-full"
          >
            Create Account
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpPage;
