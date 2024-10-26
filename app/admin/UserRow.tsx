import { IUser } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export function UserRow({ index, user }: { index: number; user: IUser }) {
  const [viewUserModel, setViewUserModal] = useState(false);

  async function handleDeleteUser(id: string) {
    try {
      const response = await axios.delete(`/api/admin/users/${id}`, {
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
      }
    }
  }

  return (
    <tr className="transition-colors duration-300 hover:bg-neutral-50">
      <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-neutral-500 text-neutral-700 ">
        {index + 1}.
      </td>
      <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-neutral-500 text-neutral-700 ">
        {user.name}
      </td>
      <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-neutral-500 text-neutral-700 ">
        {user.email}
      </td>
      <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-neutral-500 text-neutral-700 ">
        <button
          onClick={() => setViewUserModal(true)}
          className="text-white bg-neutral-800 px-6 py-2 rounded"
        >
          View
        </button>
        {viewUserModel && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="mt-10 bg-white text-neutral-950 max-w-xl w-full mx-auto rounded-md relative">
              <button
                onClick={() => setViewUserModal(false)}
                className="absolute top-2 right-2 p-2 text-2xl font-bold"
              >
                &times;
              </button>

              <div className="p-10 space-y-5">
                <div className="w-32 h-32 mx-auto">
                  <img
                    src={user.image}
                    alt="user profile photo"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>

                <div className="grid space-y-2">
                  <div>
                    <span className="text-xl font-bold">Name: </span>{" "}
                    <span className="text-lg">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold">Email: </span>{" "}
                    <span className="text-lg">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold">Phone: </span>{" "}
                    <span className="text-lg">{user.phone}</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold">Linkedin: </span>{" "}
                    <span className="text-lg">{user.linkedinUrl}</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold">X: </span>{" "}
                    <span className="text-lg">{user.xUrl}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </td>
      <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-neutral-500 text-neutral-700 ">
        <button
          onClick={async (e) => {
            e.preventDefault();

            await handleDeleteUser(user.id);
          }}
          className="flex items-center"
        >
          <FaTrash className="text-red-500 hover:text-red-700 transition-colors duration-150" />
        </button>
      </td>
    </tr>
  );
}
