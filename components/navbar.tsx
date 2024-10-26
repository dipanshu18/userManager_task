"use client";

import cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function Navbar() {
  const router = useRouter();
  const token = cookie.get("token");
  const role = cookie.get("user");

  return (
    <nav className="sticky top-0 px-8 backdrop-blur-md flex justify-between items-center py-2">
      <Link href={token && role === "ADMIN" ? "/admin" : "/user"}>
        <h1 className="md:text-xl font-medium">User management</h1>
      </Link>
      <div className="">
        {token ? (
          <button
            onClick={async (e) => {
              e.preventDefault();

              cookie.remove("token");
              cookie.remove("uid");
              cookie.remove("user");
              toast.success("Logging out...");
              router.push("/");
              router.refresh();
              return;
            }}
            className="mx-4 px-6 py-2 bg-neutral-800 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/user/login">
            <button className="mx-4 px-6 py-2 bg-neutral-800 text-white rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
