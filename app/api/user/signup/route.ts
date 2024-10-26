import { userSignupSchema } from "@/utils/types";
import users from "@/utils/users.json";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const signupBody = await req.json();

  const result = userSignupSchema.safeParse(signupBody);

  if (!result.success) {
    return NextResponse.json({ msg: "Invalid inputs" }, { status: 400 });
  }

  const { image, email, name, phone, password, linkedinUrl, xUrl } =
    result.data;

  const userExists = users.filter(
    (user) => user.email === email || user.phone === phone
  )[0];

  if (userExists) {
    return NextResponse.json(
      { msg: "User already exists. Please login" },
      { status: 400 }
    );
  }

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

  (await cookies()).set("token", crypto.randomUUID());
  (await cookies()).set("uid", newUser.id);
  (await cookies()).set("user", "USER");
  return NextResponse.json({ msg: "User created" }, { status: 201 });
}
