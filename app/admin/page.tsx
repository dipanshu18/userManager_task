"use client";

import { useState } from "react";
import { UsersTable } from "./UsersTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupSchema } from "@/utils/types";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [addUserModal, setAddUserModal] = useState(false);

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

  async function handleAddUser(values: z.infer<typeof userSignupSchema>) {
    try {
      const response = await axios.post("/api/admin/users", values);

      if (response.status === 201) {
        const data = await response.data.msg;
        toast.success(data);
        window.location.reload();
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
    <div className="m-5">
      <div className="flex items-center justify-between">
        <h1 className="text-center my-10 md:text-3xl font-bold">
          Admin dashboard
        </h1>
        <button
          onClick={() => setAddUserModal(true)}
          className="text-white bg-neutral-800 px-6 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {addUserModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="mt-10 bg-white w-fit mx-auto rounded-md relative">
            <button
              onClick={() => setAddUserModal(false)}
              className="absolute top-2 right-2 p-2 text-2xl font-bold"
            >
              &times;
            </button>
            <form
              onSubmit={handleSubmit(handleAddUser)}
              className="space-y-3 max-w-md mx-auto border border-neutral-200 p-10 rounded-md shadow"
            >
              <div className="flex flex-col space-y-1">
                <label>Profile image url:</label>
                <input
                  type="text"
                  placeholder="enter your profile pic url"
                  {...register("image")}
                  className="border rounded p-2"
                />
                {errors.image && (
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
                {errors.name && (
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
                {errors.email && (
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
                {errors.phone && (
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
                {errors.linkedinUrl && (
                  <span className="text-rose-500">
                    {errors.linkedinUrl.message}
                  </span>
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
                {errors.xUrl && (
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
                {errors.password && (
                  <span className="text-rose-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="my-5">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-2 bg-neutral-800 rounded text-white"
                >
                  {isSubmitting ? "Submitting..." : "Add user"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <UsersTable />
    </div>
  );
}
