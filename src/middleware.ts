import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return new TextEncoder().encode(secret);
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //get the path
  const token = request.cookies.get("token")?.value || ""; //get the token

  const isAdminRoute = path.startsWith("/admin/dashboard");
  const isTeacherRoute = path.startsWith("/teacher/dashboard");

  if (isAdminRoute || isTeacherRoute) {
    try {
      const { payload } = await jwtVerify(token, getJwtSecret());
      console.log("Decoded JWT:", payload);

      if (isAdminRoute && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      if (isTeacherRoute && payload.role !== "teacher") {
        return NextResponse.redirect(new URL("/teacher/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      const redirectPath = isAdminRoute ? "/admin/login" : "/teacher/login";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/teacher/dashboard"],
};
