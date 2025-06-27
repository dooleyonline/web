"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignInForm {
  username: string;
  password: string;
}

export default function SignInPage() {
  const form = useForm<SignInForm>({
    defaultValues: { username: "", password: "" },
  });
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (data: SignInForm) => {
    setServerError("");
    const url = `https://api.dooleyonline.net/auth/login/`;
    console.log(1);
    console.log("Calling:", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setServerError(
          err.detail || err.message || "Login failed. Please check your credentials."
        );
        return;
      }

      const result: { access: string; refresh: string } = await res.json();
      login(result.access, result.refresh);
      router.push("/profile");
    } catch (e) {
      console.error("Sign-in error:", e);
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serverError && (
            <p className="text-red-500 mb-3">{serverError}</p>
          )}
          <Button
            type="submit"
            className="w-full mb-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <svg
                className="animate-spin h-4 w-4 mr-2 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            Sign In
          </Button>
          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
