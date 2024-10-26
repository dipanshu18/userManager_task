import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import admin from "@/utils/admin.json";
import users from "@/utils/users.json";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const role = cookieStore.get("user")?.value;
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("uid")?.value;
  const { pathname } = request.nextUrl;

  // Define paths
  const restrictedPaths = ["/admin", "/user"];
  const publicPaths = ["/admin/login", "/user/login", "/user/signup", "/"];

  // If the user is trying to access a public path, allow access without the token
  if (publicPaths.includes(pathname)) {
    // If there's a valid token and user role, redirect to the appropriate home
    if (token && role) {
      const homeUrl = role === "ADMIN" ? "/admin" : "/user";
      return NextResponse.redirect(new URL(homeUrl, request.url));
    }
    return NextResponse.next(); // Allow access to the public path
  }

  // Redirect to login if accessing restricted paths without necessary cookies
  if (
    (!token || !role || !userId) &&
    restrictedPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  // Role-based access control with UID validation
  if (role === "ADMIN") {
    // Check if the user ID exists in adminData
    const isAdmin = admin.id === userId;
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Stick to /admin path if the role is ADMIN
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } else if (role === "USER") {
    // Check if the user ID exists in userData
    const isUser = users.some((user) => user.id === userId);
    if (!isUser) {
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
    // Stick to /user path if the role is USER
    if (!pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  // If a session exists and accessing public paths, redirect to role-based home
  if (token && publicPaths.includes(pathname)) {
    const homeUrl = role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }

  // Allow the request to continue if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/user",
    "/admin/login",
    "/user/login",
    "/user/signup",
    "/",
  ],
};
