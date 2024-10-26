import admin from "@/utils/admin.json";
import users from "@/utils/users.json";
import { userSignupSchema } from "@/utils/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const role = (await cookies()).get("user")?.value;
  const adminId = (await cookies()).get("uid")?.value;

  if (role !== "ADMIN" || adminId !== admin.id) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: NextRequest) {
  const id = (await cookies()).get("uid")?.value;

  if (admin.id !== id) {
    return NextResponse.json(
      { msg: "Only admin can access this route" },
      { status: 401 }
    );
  }

  const signupBody = await req.json();

  const result = userSignupSchema.safeParse(signupBody);

  if (!result.success) {
    return NextResponse.json({ msg: "Invalid inputs" }, { status: 400 });
  }

  const { image, email, name, phone, password, linkedinUrl, xUrl } =
    result.data;

  const newUser = {
    id: crypto.randomUUID(),
    image,
    email,
    name,
    role: "USER",
    phone,
    linkedinUrl,
    xUrl,
    password,
  };

  const updatedUsers = [...users, newUser];

  const filePath = path.join(process.cwd(), "utils", "users.json");
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

  return NextResponse.json({ msg: "User created" }, { status: 201 });
}
