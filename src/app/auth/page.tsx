"use client";

import { useState } from "react";
import { useForm, SubmitHandler, type Resolver } from "react-hook-form";
import { AuthInputs } from "../../../types/AuthInputs";
import { loginSchema } from "@/lib/zod/loginSchema";
import { registerSchema } from "@/lib/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerUser } from "@/components/Register/page";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { update: updateSession } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AuthInputs>({
    resolver: zodResolver(
      isLogin ? loginSchema : registerSchema,
    ) as Resolver<AuthInputs>,
  });

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
  try {
    clearErrors();

    if (isLogin) {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
          if (result.error === "CredentialsSignin") {
                   console.log('Error msg',result.error)
            setError("root", {
              type: "manual",
              message: "Invalid email or password",
            });
          }
           else {
            console.log('Error msg',result.error)
            setError("root", {
              type: "manual",
              message: "An error occurred during login. Please try again.",
            });
          }
        return;
      }
      else {
        await updateSession();
        router.push("/");
        toast.success("Logged in successfully");
      }


    } else {
    try {
  await registerUser({
    name: data.name!,
    email: data.email,
    password: data.password,
  });

  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  await updateSession();

  toast.success("Registered successfully");

  router.push("/");
} catch (error) {
  setError("root", {
    type: "manual",
    message:
      error instanceof Error
        ? error.message
        : "Registration failed",
  });
}
    }

  } catch (error) {
    console.error(error);

    setError("root", {
      type: "manual",
      message: "Something went wrong. Please try again.",
    });
    toast.error("Failed to create user account");
  }


};



  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="surface-card w-full max-w-md p-8">
        <p className="font-heading text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Furnia
        </p>
        <h1 className="font-heading mt-3 text-center text-3xl font-bold tracking-tight">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>

        <p className="mb-6 mt-2 text-center text-sm text-muted-foreground">
          {isLogin
            ? "Sign in to continue shopping"
            : "Join Furnia to track orders and checkout faster"}
        </p>

        <form
          key={isLogin ? "login" : "register"}
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{errors.root.message}</p>
            </div>
          )}
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                {...register("name")}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              {...register("password")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-primary/30 focus:ring-2"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}