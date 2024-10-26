"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema } from "@/utils/types";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function UserSignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof userSignupSchema>>({
    mode: "onChange",
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      image: "",
      name: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      xUrl: "",
      password: "",
    },
  });

  async function handleUserSignup(values: z.infer<typeof userSignupSchema>) {
    try {
      const response = await axios.post("/api/user/signup", values);

      if (response.status === 201) {
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
      onSubmit={handleSubmit(handleUserSignup)}
      className="space-y-3 max-w-md mx-auto border border-neutral-200 p-5 rounded shadow"
    >
      <div className="flex flex-col space-y-1">
        <label>Profile image url:</label>
        <input
          type="text"
          placeholder="enter your profile pic url"
          {...register("image")}
          className="border rounded p-2"
        />
        {errors && errors.image && (
          <span className="text-rose-500">{errors.image.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>Name:</label>
        <input
          type="text"
          placeholder="enter your name"
          {...register("name")}
          className="border rounded p-2"
        />
        {errors && errors.name && (
          <span className="text-rose-500">{errors.name.message}</span>
        )}
      </div>
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
        <label>Phone:</label>
        <input
          type="text"
          placeholder="enter your phone no."
          {...register("phone")}
          className="border rounded p-2"
        />
        {errors && errors.phone && (
          <span className="text-rose-500">{errors.phone.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>LinkedIn URL:</label>
        <input
          type="text"
          placeholder="enter your linkedin url"
          {...register("linkedinUrl")}
          className="border rounded p-2"
        />
        {errors && errors.linkedinUrl && (
          <span className="text-rose-500">{errors.linkedinUrl.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>X URL:</label>
        <input
          type="text"
          placeholder="enter your x url"
          {...register("xUrl")}
          className="border rounded p-2"
        />
        {errors && errors.xUrl && (
          <span className="text-rose-500">{errors.xUrl.message}</span>
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
          Already have an account?{" "}
          <Link href="/user/login">
            <span className="underline">Login</span>
          </Link>
        </p>
      </div>

      <div className="my-5">
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-2 bg-neutral-800 rounded text-white"
        >
          {isSubmitting ? "Submitting..." : "Signup"}
        </button>
      </div>
    </form>
  );
}
