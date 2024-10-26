import users from "@/utils/users.json";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest, { params }) {
  const id = params.id;

  const userExists = users.filter((user) => user.id === id)[0];

  if (!userExists) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }

  return NextResponse.json(userExists, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }) {
  const id = params.id;

  const userExists = users.filter((user) => user.id === id)[0];

  if (!userExists) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }

  const updatedUsers = users.filter((user) => user.id !== id);

  const filePath = path.join(process.cwd(), "utils", "users.json");
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

  return NextResponse.json({ msg: "User deleted" }, { status: 200 });
}
