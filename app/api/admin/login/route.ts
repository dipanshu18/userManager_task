import { loginSchema } from "@/utils/types";
import admin from "@/utils/admin.json";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const loginBody = await req.json();

  const result = loginSchema.safeParse(loginBody);

  if (!result.success) {
    return NextResponse.json({ msg: "Invalid inputs" }, { status: 400 });
  }

  const { email, password } = result.data;

  if (admin.email === email && admin.password === password) {
    (await cookies()).set("token", crypto.randomUUID());
    (await cookies()).set("uid", admin.id);
    (await cookies()).set("user", "ADMIN");

    return NextResponse.json({ msg: "Credentials verified" }, { status: 200 });
  }

  return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
}
