"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function UserLoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  async function handleUserLogin(values: z.infer<typeof loginSchema>) {
    try {
      const response = await axios.post("/api/user/login", values);

      if (response.status === 200) {
        const data = await response.data.msg;
        toast.success(data);
        router.replace("/user");
        router.refresh();
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.msg;
        toast.error(errorData);
        console.log("Error:", error);
      }
    } finally {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUserLogin)}
      className="space-y-3 max-w-md mx-auto border border-neutral-200 p-5 rounded shadow"
    >
      <div className="flex flex-col space-y-1">
        <label>Email:</label>
        <input
          type="email"
          placeholder="enter your email"
          {...register("email")}
          className="border rounded p-2"
        />
        {errors && errors.email && (
          <span className="text-rose-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>Password:</label>
        <input
          type="password"
          placeholder="enter your password"
          {...register("password")}
          className="border rounded p-2"
        />
        {errors && errors.password && (
          <span className="text-rose-500">{errors.password.message}</span>
        )}
      </div>

      <div>
        <p className="text-sm text-neutral-800">
          Don{`'`}t have an account?{" "}
          <Link href="/user/signup">
            <span className="underline">Signup</span>
          </Link>
        </p>
      </div>

      <div className="my-5">
        <button
          disabled={isSubmitting}
          className="w-full py-2 bg-neutral-800 rounded text-white"
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </div>
    </form>
  );
}
