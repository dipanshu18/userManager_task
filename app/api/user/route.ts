import users from "@/utils/users.json";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const role = (await cookies()).get("user")?.value;
  const userId = (await cookies()).get("uid")?.value;

  const userRegistered = users.filter((user) => user.id === userId)[0];
  if (role !== "USER" || !userRegistered) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const userExists = users.filter((user) => user.id === userId)[0];

  if (userExists) {
    return NextResponse.json(userExists, { status: 200 });
  }

  return NextResponse.json({ msg: "User not found" }, { status: 404 });
}
