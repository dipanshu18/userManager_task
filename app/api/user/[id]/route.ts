import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import users from "@/utils/users.json";
import fs from "fs";
import path from "path";

export async function PUT(req: NextRequest, { params }) {
  const role = (await cookies()).get("user")?.value;
  const userId = (await cookies()).get("uid")?.value;

  const userRegistered = users.filter((user) => user.id === userId)[0];
  if (role !== "USER" || !userRegistered) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const userExists = users.filter((user) => user.id === userId)[0];

  if (!userExists) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }

  const data = await req.json();
  const { image, name, email, phone, linkedinUrl, xUrl, password } = data;

  const userIndex = users.findIndex((user) => user.id === params.id);
  if (userIndex === -1) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }

  if (image) users[userIndex].image = image;
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  if (phone) users[userIndex].phone = phone;
  if (linkedinUrl) users[userIndex].linkedinUrl = linkedinUrl;
  if (xUrl) users[userIndex].xUrl = xUrl;
  if (password) users[userIndex].password = password;

  const filePath = path.join(process.cwd(), "utils", "users.json");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json(
    { msg: "Profile updated successfully" },
    { status: 200 }
  );
}
