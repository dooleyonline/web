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

import { SignInData, signInForm } from "./schema";

const REDIRECT_PATH = "/";

export default function SignInPage() {
  const { accessToken, handleSignIn } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInForm),
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (accessToken) {
      router.push(REDIRECT_PATH);
    }
  }, [accessToken, router]);

  const handleSubmit = async (data: SignInData) => {
    const { data: resData, error } = await apiFetch<{
      access: string;
      refresh: string;
    }>(ENDPOINTS.AUTH.SIGN_IN, {
      method: "POST",
      data,
    });

    if (error || !resData) {
      console.error("Error signing in:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
      return;
    }

    handleSignIn({
      newAccessToken: resData.access,
      newRefreshToken: resData.refresh,
    });

    toast.success("Welcome!", { position: "top-center" });
    router.push(REDIRECT_PATH);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              !signInForm.safeParse(form.watch()).success
            }
          >
            Sign In
          </Button>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
