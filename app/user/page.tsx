/* eslint-disable @next/next/no-img-element */
"use client";

import { IUser, userSignupSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoading(true);
        const response = await axios.get("/api/user", {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = await response.data;
          setUserData(data);
          return;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorData = await error.response?.data.msg;
          toast.error(errorData);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<z.infer<typeof userSignupSchema>>({
    mode: "onChange",
    resolver: zodResolver(userSignupSchema),
  });

  useEffect(() => {
    if (userData) {
      reset({
        image: userData.image,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        linkedinUrl: userData.linkedinUrl,
        xUrl: userData.xUrl,
        password: userData.password,
      });
    }
  }, [userData, reset]);

  async function handleEditUser(values: z.infer<typeof userSignupSchema>) {
    try {
      if (Object.keys(dirtyFields).length === 0) {
        return toast.error("Nothing to update");
      }

      const response = await axios.put(`/api/user/${userData?.id}`, values, {
        withCredentials: true,
      });

      if (response.status === 200) {
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

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <div className="my-10 mx-5">
      <h1 className="text-3xl font-bold text-center">Hi, {userData?.name}</h1>

      <div className="flex flex-col max-w-2xl mx-auto my-10 space-y-5 p-10 rounded-md shadow-md border border-neutral-500">
        <div className="flex justify-center md:justify-between w-full items-center">
          <div className="rounded w-32 h-32">
            <img
              src={userData?.image}
              alt="User profile pic"
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <div className="hidden md:flex">
            <button
              onClick={() => setEditProfileModal(true)}
              className="py-2 px-6 bg-neutral-800 text-white rounded"
            >
              Edit profile
            </button>
          </div>

          {editProfileModal && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="mt-10 bg-white w-fit mx-auto rounded-md relative">
                <button
                  onClick={() => setEditProfileModal(false)}
                  className="absolute top-2 right-2 p-2 text-2xl font-bold"
                >
                  &times;
                </button>
                <form
                  onSubmit={handleSubmit(handleEditUser)}
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
                      <span className="text-rose-500">
                        {errors.image.message}
                      </span>
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
                      <span className="text-rose-500">
                        {errors.name.message}
                      </span>
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
                      <span className="text-rose-500">
                        {errors.email.message}
                      </span>
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
                      <span className="text-rose-500">
                        {errors.phone.message}
                      </span>
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
                      <span className="text-rose-500">
                        {errors.xUrl.message}
                      </span>
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
                      {isSubmitting ? "Submitting..." : "Edit user"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="grid space-y-2">
          <div>
            <span className="text-xl font-bold">Name: </span>{" "}
            <span className="text-lg">{userData?.name}</span>
          </div>
          <div>
            <span className="text-xl font-bold">Email: </span>{" "}
            <span className="text-lg">{userData?.email}</span>
          </div>
          <div>
            <span className="text-xl font-bold">Phone: </span>{" "}
            <span className="text-lg">{userData?.phone}</span>
          </div>
          <div>
            <span className="text-xl font-bold">Linkedin: </span>{" "}
            <span className="text-lg">{userData?.linkedinUrl}</span>
          </div>
          <div>
            <span className="text-xl font-bold">X: </span>{" "}
            <span className="text-lg">{userData?.xUrl}</span>
          </div>
        </div>
        <div className="flex md:hidden justify-center">
          <button className="py-2 px-6 bg-neutral-800 text-white rounded">
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
}
