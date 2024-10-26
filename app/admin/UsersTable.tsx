"use client";

import { useEffect, useState } from "react";
import { UserRow } from "./UserRow";
import { IUser } from "@/utils/types";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export function UsersTable() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/users", {
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = await response.data;
          setUsers(data);
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

    fetchUsers();
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        {users && users.length > 0 ? (
          <table
            className="w-full text-left border border-separate rounded border-neutral-200"
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 w-24 px-6 text-sm font-medium border-l first:border-l-0 stroke-neutral-700 text-neutral-700 bg-neutral-100"
                >
                  Sr no.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-neutral-700 text-neutral-700 bg-neutral-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-neutral-700 text-neutral-700 bg-neutral-100"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="h-12 w-20 px-6 text-sm font-medium border-l first:border-l-0 stroke-neutral-700 text-neutral-700 bg-neutral-100"
                ></th>
                <th
                  scope="col"
                  className="h-12 w-20 px-6 text-sm font-medium border-l first:border-l-0 stroke-neutral-700 text-neutral-700 bg-neutral-100"
                ></th>
              </tr>
              {users.map((user, idx) => (
                <UserRow index={idx} user={user} key={user.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No users registered yet :(</h1>
        )}
      </div>
    </>
  );
}
