import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { msg: "Logout Successfull" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      path: "/",
      expires: new Date(0),
    });
    return response;
    return NextResponse.json({ msg: "Token remove" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Could not logout" }, { status: 500 });
  }
}
