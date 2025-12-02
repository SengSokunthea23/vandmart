"use client";

import type React from "react";

import { useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Form, FormControl, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [pending, setTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setTransition(async () => {
      try {
        const res = await signIn.email({
          email: data.email,
          password: data.password,
        });

        if (res.error) {
          toast.error(res.error.message ?? "Login failed!");
        } else {
          reset();
          toast.success("Login successful!");
          router.push("/");
        }
      } catch (error) {
        const e = error as Error;
        toast.error(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="Email"
              className={cn("h-12", {
                "border-destructive": errors.email,
              })}
              {...register("email")}
              disabled={pending}
            />
          </FormControl>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={cn("h-12", {
                "border-destructive": errors.password,
              })}
              disabled={pending}
            />
          </FormControl>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Sign In"}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <p className="text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-slate-900 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
