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
import { useRouter } from "next/navigation";

import Link from "next/link";

interface SignUpForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export default function SignUpPage() {
  const form = useForm<SignUpForm>({
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
    },
  });
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (data: SignUpForm) => {
    setServerError("");
    const url = `https://api.dooleyonline.net/auth/register/`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || res.statusText);
      }

      // if signup is successful, redirect to sign-in page
      router.push("/sign-in");
    } catch (error: any) {
      console.error("Signup error:", error);
      setServerError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
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
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Create a password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password2"
            rules={{
              required: "Please confirm password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Re-enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && <p className="text-red-500 mb-3">{serverError}</p>}

          <Button type="submit" className="w-full mb-4">
            Create Account
          </Button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
