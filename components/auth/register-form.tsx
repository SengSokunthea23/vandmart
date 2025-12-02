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
import { Form, FormControl, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [pending, setTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setTransition(async () => {
      const res = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (res.data?.user) {
        toast.success("Signup successful!");
        router.push("/");
      } else {
        toast.error(res.error?.message ?? "Signup failed!");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Name"
              {...register("name")}
              className={cn("h-12", {
                "border-destructive": errors.name,
              })}
              disabled={pending}
            />
          </FormControl>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={cn("h-12", {
                "border-destructive": errors.email,
              })}
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
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 h-auto"
          disabled={pending}
        >
          {pending ? "Creating account..." : "Create Account"}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-slate-900 font-semibold hover:text-slate-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
