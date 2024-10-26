import { loginSchema } from "@/utils/types";
import users from "@/utils/users.json";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const loginBody = await req.json();

  const result = loginSchema.safeParse(loginBody);

  if (!result.success) {
    return NextResponse.json({ msg: "Invalid inputs" }, { status: 400 });
  }

  const { email, password } = result.data;

  const userExists = users.filter((user) => user.email === email)[0];

  if (userExists.email === email && userExists.password === password) {
    (await cookies()).set("token", crypto.randomUUID());
    (await cookies()).set("uid", userExists.id);
    (await cookies()).set("user", "USER");
    return NextResponse.json({ msg: "Credentials verified" }, { status: 200 });
  }

  return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
}
